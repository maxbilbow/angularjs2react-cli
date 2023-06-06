package io.github.ng2react;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class AngularJSToReact {
    private static final Logger LOGGER = LoggerFactory.getLogger(AngularJSToReact.class);
    private final Cli cli;

    public AngularJSToReact() throws IOException {
        this.cli = new Cli();
    }

    public String help() throws IOException {
        return this.cli.call(Collections.singletonList("--help"), String.class);
    }

    /**
     * Checks the connection to the API
     */
    public boolean checkConnection(Ng2rCheckOptions options) throws IOException {
        final String[] cmd = {
                Ng2rCommand.CHECK_CONNECTION.value(),
                Ng2rOption.API_KEY.value(),
                Objects.requireNonNull(options.getApiKey()),
                Ng2rOption.MODEL.value(),
                Objects.requireNonNull(options.getModel().value())
        };
        try {
            LOGGER.info("OpenAI Connection test: {}", this.cli.call(cmd, String.class));
        } catch (IOException e) {
            LOGGER.error("OpenAI Connection test failed: {}", e.getMessage());
            return false;
        }
        return true;
    }

    /**
     * Searches a file for convertable AngularJS Components
     */
    public Ng2rSearchResult search(Ng2rSearchOptions options) throws IOException {
        LOGGER.debug("Finding components in " + options.getFile() + "...");
        final String[] cmd = {
                Ng2rCommand.SEARCH.value(),
                Objects.requireNonNull(options.getFile())
        };
        return cli.call(cmd, Ng2rSearchResult.class);
    }

    /**
     * Converts an AngularJS component to React
     */
    public Ng2rGenerationResponse convert(Ng2rConvertOptions options) throws IOException {
        LOGGER.debug("Converting component " + options.getComponentName() + " in " + options.getFile() + "...");
        final List<String> cmd = new ArrayList<>(List.of(
                Ng2rCommand.CONVERT.value(),
                Objects.requireNonNull(options.getFile()),
                Objects.requireNonNull(options.getComponentName()),
                Ng2rOption.SOURCE_ROOT.value(),
                Objects.requireNonNull(options.getSourceRoot())
        ));
        cmd.addAll(getTestOptions(options));
        options.getCustomPrompt().ifPresent(value -> {
            cmd.add(Ng2rOption.CUSTOM_PROMPT.value());
            cmd.add(value);
        });
        return cli.call(cmd, Ng2rGenerationResponse.class);
    }

    /**
     * Generates a unit test for a React component
     */
    public Ng2rGenerationResponse generateReactTest(Ng2rTestGenerationOptions options) throws IOException {
        LOGGER.debug("Generating test for " + options.getFile() + "...");
        final List<String> cmd = new ArrayList<>(List.of(
                Ng2rCommand.GENERATE_REACT_TEST.value(),
                Objects.requireNonNull(options.getFile())
        ));
        cmd.addAll(getTestOptions(options));
        return cli.call(cmd, Ng2rGenerationResponse.class);
    }

    private List<String> getTestOptions(Ng2rGptOptions options) {
        final List<String> cmd = new ArrayList<>(List.of(
                Ng2rOption.API_KEY.value(),
                Objects.requireNonNull(options.getApiKey())
        ));
        options.getOrganization().ifPresent(value -> {
            cmd.add(Ng2rOption.ORGANIZATION.value());
            cmd.add(value);
        });
        options.getModel().ifPresent(value -> {
            cmd.add(Ng2rOption.MODEL.value());
            cmd.add(value.value());
        });
        options.getTemperature().ifPresent(value -> {
            cmd.add(Ng2rOption.TEMPERATURE.value());
            cmd.add(value.toString());
        });
        options.getTargetLanguage().ifPresent(value -> {
            cmd.add(Ng2rOption.TARGET_LANGUAGE.value());
            cmd.add(value.value());
        });
        return cmd;
    }
}
