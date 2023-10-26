package com.nocountry.finanzas.services.impl;

import com.nocountry.finanzas.entities.Egress;
import com.nocountry.finanzas.entities.EgressCategory;
import com.nocountry.finanzas.entities.User;
import com.nocountry.finanzas.entities.enums.CategoryEnum;
import com.nocountry.finanzas.exceptions.BadRequestException;
import com.nocountry.finanzas.models.egress.CreateEgressDTO;
import com.nocountry.finanzas.models.egress.CustomSearchDTO;
import com.nocountry.finanzas.models.egress.EgressDTO;
import com.nocountry.finanzas.models.egress.MapperEgress;
import com.nocountry.finanzas.repositories.EgressCategoryRepository;
import com.nocountry.finanzas.repositories.EgressRepository;
import com.nocountry.finanzas.repositories.UserRepository;
import com.nocountry.finanzas.services.EgressCategoryService;
import com.nocountry.finanzas.services.EgressService;
import jakarta.annotation.Nullable;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EgressServiceImpl implements EgressService {

    private final EgressRepository egressRepository;

    private final EgressCategoryService egressCategoryService;

    private final EgressCategoryRepository egressCategoryRepository;

    private final MapperEgress egressMapper;

    private final UserRepository userRepository;

    @Autowired
    public EgressServiceImpl(EgressRepository egressRepository, EgressCategoryService egressCategoryService,
                             MapperEgress egressMapper, UserRepository userRepository, EgressCategoryRepository egressCategoryRepository) {
        this.egressRepository = egressRepository;
        this.egressCategoryService = egressCategoryService;
        this.egressMapper = egressMapper;
        this.userRepository = userRepository;
        this.egressCategoryRepository = egressCategoryRepository;
    }

    @Transactional
    @Override
    public EgressDTO createdEgress(CreateEgressDTO egressDTO) throws BadRequestException {
        Egress egress = egressMapper.toEgress(egressDTO);
        User user = userRepository.findById(egress.getUser().getId()).get();

        CategoryEnum categoryEnum = searchCategoryEnum(egressDTO.getCategoryName());
        EgressCategory egressCategory = egressCategoryRepository.findByName(categoryEnum);

        if (egressCategory == null) {
            throw new BadRequestException("La categoría no existe: " + egressDTO.getCategoryName());
        }

        egress.setEgressCategory(egressCategory);
        egress.setUser(user);
        egressRepository.save(egress);

        user.getEgresses().add(egress); // guardo el egreso nuevo en la lista de egresos del usuario
        user.setTotalIncome(user.getTotalIncome() - egress.getAmount());

        return egressMapper.toDTO(egress);
    }

    @Transactional
    @Override
    public EgressDTO updateEgress(EgressDTO egressDTO) {
        Egress egress = egressMapper.toEgress(egressDTO);

        egressCategoryService.updateEgressCategory(egress.getEgressCategory());
        egressRepository.save(egress);
        return egressMapper.toDTO(egress);
    }

    @Transactional(readOnly = true)
    @Override
    public List<EgressDTO> getAllEgress() {

        return egressMapper.egressDTOList(egressRepository.findAll());
    }

    @Transactional(readOnly = true)
    @Override
    public EgressDTO getEgressById(Long id) {

        return egressMapper.toDTO(egressRepository.findById(id).get());
    }

    @Transactional
    @Override
    public void deleteEgressById(Long id) {
        Egress egress = egressRepository.findById(id).get();
        User user = userRepository.findById(egress.getUser().getId()).get();

        // como antes al agregar un egreso, le resto al total el monto del mismo. Al eliminar el egreso,
        // por la razon q sea, tengo q agregar el monto de nuevo al usuario, ya que no se gasto realmente.
        user.setTotalIncome(user.getTotalIncome() + egress.getAmount());
        user.getEgresses().remove(egress);

        egressRepository.deleteById(id);
    }

    @Transactional
    @Override
    public List<EgressDTO> getEgressByUser(Long idUser) {
        User user = userRepository.findById(idUser).get();

        return  egressMapper.egressDTOList(user.getEgresses());
    }

    @Override
    public List<EgressDTO> findByMontAndCategory(Long id, CustomSearchDTO customSearchDTO) {
        int year = LocalDate.now().getYear();

        if (customSearchDTO.getCategoryId() == null && customSearchDTO.getMonth() != null) {
            LocalDate monthLocalDate = LocalDate.of(year, customSearchDTO.getMonth(), 1);
            return egressMapper.egressDTOList(egressRepository.findByMonth(id, monthLocalDate));

        } else if (customSearchDTO.getCategoryId() != null && customSearchDTO.getMonth() == null) {
            return egressMapper.egressDTOList(egressRepository.findEgressByCategoryId(id, customSearchDTO.getCategoryId()));
        } else if (customSearchDTO.getCategoryId() != null && customSearchDTO.getMonth() != null) {
            LocalDate monthLocalDate = LocalDate.of(year, customSearchDTO.getMonth(), 1);
            return egressMapper.egressDTOList(egressRepository.findByMonthAndCategory(id, monthLocalDate, customSearchDTO.getCategoryId()));
        }
        return egressMapper.egressDTOList(egressRepository.findAllByUserId(id));
    }


    @Override
    public List<EgressDTO> getAllEgressPageable(Long userId, Integer page ){

        if (page == null || page == 0) {
            Pageable egressPageable = PageRequest.of(0, 10);
            List<Egress> egressList = egressRepository.findByUserId(userId,egressPageable);

            return egressMapper.egressDTOList(egressList);
        }
        Pageable egressPageable = PageRequest.of(page, 10);
        List<Egress> egressList = egressRepository.findAll(egressPageable).getContent();

        return egressMapper.egressDTOList(egressList);

    }

    private CategoryEnum searchCategoryEnum(String name) {
        for (CategoryEnum element: CategoryEnum.values()) {
            if (element.name().equalsIgnoreCase(name)) {
                return element;
            }
        }

        return CategoryEnum.OTROS;
    }

}
