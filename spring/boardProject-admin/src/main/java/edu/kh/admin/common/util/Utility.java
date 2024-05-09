package edu.kh.admin.common.util;

import java.util.Random;

public class Utility {
	
	private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    public static String generatePassword() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        
        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        
        return sb.toString();
    }

	
}
