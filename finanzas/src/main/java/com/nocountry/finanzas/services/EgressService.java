package com.nocountry.finanzas.services;

import com.nocountry.finanzas.entities.Egress;

import java.util.List;

public interface EgressService {

    public Egress createdEgress(Egress egress);

    public Egress updateEgress(Egress egress);

    public List<Egress> getAllEgress();

    public Egress getEgressById(Long id);

    public void deleteEgressById(Long id);


}
