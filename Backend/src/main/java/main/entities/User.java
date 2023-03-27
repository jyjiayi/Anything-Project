package main.entities;

import javax.persistence.Table;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

// User entity that corresponds to the user table in database
@Entity
@Table(name="Users")
public class User {

	@Id
	private String username;
	
	@OneToMany(mappedBy="username")
	private List<Question> qnsList;
	
	public User() {}
	
	public User(String username) {
		super();
		this.username = username;
	}
	
	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public List<Question> getQnsList() {
		return this.qnsList;
	}
	
	public void setQnsList(List<Question> qnsList) {
		this.qnsList = qnsList;
	}
	
}
