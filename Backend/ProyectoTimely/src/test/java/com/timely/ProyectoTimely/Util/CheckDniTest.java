package com.timely.ProyectoTimely.Util;

import com.timely.ProyectoTimely.util.CheckDni;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class CheckDniTest {
    @Test
    void validDni_debeRetornarTrue_CuendoDniEsCorrecto(){
        assertTrue(CheckDni.validDni("12345678Z"));
    }

    @Test
    void validDni_DebeRetornarFalse_CuandoDniEsCorto() {
        assertFalse(CheckDni.validDni("1234567"));
    }

    @Test
    void validDni_DebeRetornarFalse_CuandoLetraNoCorresponde() {
        // Un DNI con letra inventada
        assertFalse(CheckDni.validDni("12345678A"));
    }
}
