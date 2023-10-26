package com.nocountry.finanzas.services;

import com.nocountry.finanzas.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;
    @MockBean
    private UserRepository userRepository;
/*
    @BeforeEach
    void setUp() {

        Mockito.when(userRepository.save(Mockito.any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User user = User.builder()
                .id(1L)
                .name("Name")
                .last_name("Last Name")
                .email("email@prueba.com")
                .birthday_date(LocalDate.now())
                .password("password")
                .build();
        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    }

    @Test
    @DisplayName("Prueba de obtencion de un usuario, enviando un id correcto")
    public void findById() throws NotFoundException {
        Long id = 1L;
        User user = userService.getUserById(id);
        assertEquals(id,user.getId());
        System.out.println(user.toString());
    }

    @Test
    @DisplayName("Prueba de modificación de un usuario")
    public void modifyUser() throws NotFoundException{
        // Paso 1: Crear un UserRequestDTO con los datos de actualización
        UserRequestDTO userRequestDTO = new UserRequestDTO();
        userRequestDTO.setName("NuevoNombre");
        userRequestDTO.setLast_name("NuevoApellido");
        userRequestDTO.setEmail("nuevoemail@prueba.com");


        // Paso 2: Llamar al método de servicio updateUser con el ID y el DTO
        Long id = 1L;
        UserResponseDTO modifiedUser = userService.updateUser(id, userRequestDTO);

        // Paso 3: Verificar que el usuario modificado tenga los atributos correctos
        assertEquals("NuevoNombre", modifiedUser.getName());
        assertEquals("NuevoApellido", modifiedUser.getLast_name());
        assertEquals("nuevoemail@prueba.com", modifiedUser.getEmail());
    }

 */
}