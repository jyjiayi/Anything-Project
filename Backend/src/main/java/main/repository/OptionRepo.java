package main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import main.entities.Option;

// repo for Option Entity to access to the option table in database
@Repository
public interface OptionRepo extends JpaRepository<Option, Integer>{
	
	// delete the option based on a given qns_id
    @Modifying
    @Query("DELETE FROM Option WHERE qns_id = :qns_id")
    void deleteOpt(@Param("qns_id") int qns_id);
}
