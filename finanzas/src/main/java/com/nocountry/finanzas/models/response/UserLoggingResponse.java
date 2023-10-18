package com.nocountry.finanzas.models.response;

import lombok.Data;

@Data
public class UserLoggingResponse extends UserResponseDTO {
    private String errorMessage;
}
