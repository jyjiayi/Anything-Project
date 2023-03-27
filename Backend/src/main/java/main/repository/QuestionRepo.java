package main.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import main.entities.Question;

//repo for Question Entity to access to the question table in database
@Repository
public interface QuestionRepo extends JpaRepository<Question, Integer>{
	
	// update the selected_opt column based on a given qns_id
    @Modifying
    @Query("UPDATE Question SET selected_opt = :selected_opt WHERE qns_id = :qns_id")
    void updateSelectedOpt(@Param("selected_opt") String selected_opt, @Param("qns_id") int qns_id);

}
