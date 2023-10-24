package com.nocountry.finanzas.models.user;

import com.nocountry.finanzas.models.user.UserResponseDTO;
import lombok.Data;

@Data
public class UserLoggingResponse extends UserResponseDTO {
    private String errorMessage;
}
