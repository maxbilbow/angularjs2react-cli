package io.github.ng2react;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermission;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static java.lang.System.out;

class Cli {

    private static final Logger LOGGER = LoggerFactory.getLogger(Cli.class);
    private final String cliPath;

    Cli() throws IOException {
        cliPath = createTemporaryCli().toString();
    }

    <T> T call(final List<String> args, final Class<T> tClass) throws IOException {
        return call(args.toArray(new String[0]), tClass);
    }

    <T> T call(final String[] args, final Class<T> tClass) throws IOException {
        final String[] cmd = new String[args.length + 1];

        cmd[0] = cliPath;
        System.arraycopy(args, 0, cmd, 1, args.length);

        LOGGER.debug(String.join(", ", cmd));

        final ProcessBuilder pb = new ProcessBuilder(cmd)
                .redirectError(ProcessBuilder.Redirect.INHERIT);

        final Process process = pb.start();

        try (final InputStreamReader in = new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8);
             final BufferedReader stdout = new BufferedReader(in)) {
            String output = stdout.lines().collect(Collectors.joining("\n")).trim();
            if (tClass == String.class) {
                return tClass.cast(output);
            }

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(output, tClass);
        }
    }

    private static Path createTemporaryCli() throws IOException {
        final Path tempCli = Files.createTempFile("ng2r", ".js");
        try (final InputStream in = AngularJSToReact.class.getResourceAsStream("/ng2r.js");
             final OutputStream out = Files.newOutputStream(tempCli)) {
            out.write(Objects.requireNonNull(in).readAllBytes());
            if (!tempCli.toFile().setExecutable(true)) {
                Files.deleteIfExists(tempCli);
                throw new RuntimeException("Failed to set executable: " + tempCli);
            }
            tempCli.toFile().deleteOnExit();
            return tempCli;
        }
    }
}
