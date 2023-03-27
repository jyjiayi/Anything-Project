package main.helperFunctions;

import main.entities.Option;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

// to randomly generate an option from a list of weighted options
public class WeightedRandGen {
	
	// nested class to store each entry
    private class Entry {
        int accumulatedWeight;
        Option option;
    }

    // list of entries
    private List<Entry> entries = new ArrayList<>();
    
    // sum of all weights based on current entries
    private int accumulatedWeight;
    
    private Random rand = new Random();

    // function to add an entry to the list
    public void addEntry(Option option, int weight) {
    	// add on to the accumulated weight
        accumulatedWeight += weight;
        
        // create a new entry object and set its values
        Entry e = new Entry();
        e.option = option;
        e.accumulatedWeight = accumulatedWeight;
        
        // add on to the list of entries
        entries.add(e);
    }

    // choose an entry randomly
    public Option getRandom() {
    	// generate a random number from 0 to the acc weight
        double r = rand.nextDouble() * accumulatedWeight;

        // loop thru the entry and if the random number falls within the range
        for (Entry entry: entries) {
            if (entry.accumulatedWeight >= r) {
                return entry.option;
            }
        }
        return null; //should only happen when there are no entries
    }
}
