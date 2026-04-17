import org.apache.commons.net.pop3.POP3Client;
import org.apache.commons.net.pop3.POP3MessageInfo;

import java.io.IOException;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    private static final String HOST = "pop3.mailtrap.io";
    private static final int PUERTO = 1100;
    private static final String USER = "4ff289393e7823";
    private static final String PASS = "23945664e835cb";
    public static void main(String[] args) {
    //Cliente que se conecta al servidor remoto
        POP3Client pop3Clien = new POP3Client();

        try {
            pop3Clien.connect(HOST, PUERTO);
            if (!pop3Clien.login(USER, PASS)){
                System.out.println("Error de conxion");
            }

            POP3MessageInfo [] mensajes = pop3Clien.listMessages();

            int numMesaaje = mensajes.length;
            System.out.printf("el nmero de mensajes recibidos es " + numMesaaje);

            for (POP3MessageInfo info: mensajes){
                System.out.println("Mensaje " + info.number + " (" + info.size + " bytes");
            }


        }catch (IOException e){e.printStackTrace();
        }finally {
            try {
                if (pop3Clien.isConnected()) {
                    pop3Clien.logout();
                    pop3Clien.disconnect();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}