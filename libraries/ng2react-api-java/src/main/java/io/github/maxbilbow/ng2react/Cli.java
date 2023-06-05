package io.github.maxbilbow.ng2react;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

class Cli {

    private final Logger LOGGER = LoggerFactory.getLogger(Cli.class);
    private final Path cli;

    Cli() {
        final URL cli = Objects.requireNonNull(AngularJSToReact.class.getResource("/ng2r.js"));
        this.cli = Path.of(cli.getPath());
    }

    Cli(Path cli) {
        this.cli = cli;
    }

    <T> T call(final List<String> args, final Class<T> tClass) throws IOException {
        return call(args.toArray(new String[0]), tClass);
    }

    <T> T call(final String[] args, final Class<T> tClass) throws IOException {
        final String[] cmd = new String[args.length + 1];
        cmd[0] = cli.toString();
        System.arraycopy(args, 0, cmd, 1, args.length);

        LOGGER.debug(String.join(", ", cmd));

        ProcessBuilder pb = new ProcessBuilder(cmd)
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
}
