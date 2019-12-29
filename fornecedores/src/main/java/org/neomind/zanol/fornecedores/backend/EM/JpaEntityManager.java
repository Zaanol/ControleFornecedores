package org.neomind.zanol.fornecedores.backend.EM;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

//Classe responsável pela administradação das entidades
public class JpaEntityManager {
	private EntityManagerFactory factory = Persistence.createEntityManagerFactory("fornecedores");
	private EntityManager em = factory.createEntityManager();
	
	public EntityManager getEntityManager(){
		return em;
	}
}