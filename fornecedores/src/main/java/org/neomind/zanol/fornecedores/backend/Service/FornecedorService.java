package org.neomind.zanol.fornecedores.backend.Service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.neomind.zanol.fornecedores.backend.EM.JpaEntityManager;
import org.neomind.zanol.fornecedores.backend.Model.Fornecedor;

//Classe responsável pela criação das rotas REST
@Path("/")
public class FornecedorService {   
	//Declaração da variável que contém informações para persistir dados hibernate
	private JpaEntityManager JPAEM = new JpaEntityManager();
	private EntityManager objEM = JPAEM.getEntityManager();
	
	//Função para recuperar todos os fornecedores
    @GET
    @Path("/listar")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Fornecedor> listarFornecedores() {    	
		try {
			//Criação do código jpql
			Query query = objEM.createQuery("select f from Fornecedor f", Fornecedor.class);
			@SuppressWarnings("unchecked")
			List<Fornecedor> fornecedores = query.getResultList();
			//Finalização
			objEM.close();
			return fornecedores;
		} catch (Exception e) {
			throw new WebApplicationException(500);
		}
    }
    
    //Rota responsável por retornar um fornecedor de acordo com o ID
    @GET
    @Path("/listar/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Fornecedor buscar(@PathParam("id") int id) {
    	try {
    		Fornecedor fornecedor = objEM.find(Fornecedor.class, id);
    		objEM.close();
    		return fornecedor;
		} catch (Exception e) {
    		throw new WebApplicationException(500);
		}
    }
    
    //Rota responsável por cadastrar o fornecedor
    @POST
    @Path("/cadastrar")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrar(Fornecedor objFornecedor) {
    	try {
    		objEM.getTransaction().begin();
    		objEM.persist(objFornecedor);
    		objEM.getTransaction().commit();
    		objEM.close();
    		return Response.status(Response.Status.OK).entity("Fornecedor cadastrado com sucesso").build();
    	} catch (Exception e) {
    		throw new WebApplicationException(500);
    	}
    }
    
    //Rota responsável por atualizar o fornecedor
    @PUT
    @Path("/alterar")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response alterar(Fornecedor objFornecedor) {
    	try {
    		objEM.getTransaction().begin();
    		objEM.merge(objFornecedor);
    		objEM.getTransaction().commit();
    		objEM.close();
    		return Response.status(Response.Status.OK).entity("Fornecedor alterado com sucesso").build();
    	} catch (Exception e) {
    		throw new WebApplicationException(500);
    	}
    }
    
    //Rota responsável pela exclusão do fornecedor
    @DELETE
    @Path("/excluir/{id}")
    public Response excluir(@PathParam("id") int id) {
    	try {
    		Fornecedor objFornecedor = objEM.find(Fornecedor.class, id);
    		
    		objEM.getTransaction().begin();
    		objEM.remove(objFornecedor);
    		objEM.getTransaction().commit();
    		objEM.close();
    		
    		return Response.status(Response.Status.OK).entity("Fornecedor removido com sucesso").build();
    	} catch (Exception e) {
    		throw new WebApplicationException(500);
    	}
    }
}