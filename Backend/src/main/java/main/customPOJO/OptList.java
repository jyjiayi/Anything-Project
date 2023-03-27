package main.customPOJO;

import java.util.List;

import main.entities.Option;

// custom POJO for updating the options
public class OptList {
	private List<Option> optList;

	public List<Option> getOptList() {
		return this.optList;
	}

	public void setOptList(List<Option> optList) {
		this.optList = optList;
	}

	// for checking if inputs from front end are valid
	public boolean isValid() {
		
		// check that none of the inputs for the options are empty
		for (int i = 0; i < optList.size(); i++) {
			if (optList.get(i).getOption().isBlank()) {
				return false;
			}
		}

		return true;
	}

}
