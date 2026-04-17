import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class SMTP {
    public static void main(String[] args) {
        try {
            ServerSocket servidor = new ServerSocket(8000);
                Socket cliente = servidor.accept();
                BufferedReader entrada = new BufferedReader(new InputStreamReader(
                                    cliente.getInputStream()));

                    PrintWriter salida = new PrintWriter(
                            cliente.getOutputStream(), true);

                    String mensaje = entrada.readLine();
                    salida.println(mensaje.toUpperCase());
                    cliente.close();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
