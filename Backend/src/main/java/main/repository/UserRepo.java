package main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.entities.User;


// repo for User Entity to access to the user table in the database
@Repository
public interface UserRepo extends JpaRepository<User, String>{
    
}
