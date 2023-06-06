package io.github.ng2react;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.Objects;

class AngularJSToReactTest {
    private static final String TODO_COMPONENT = Objects.requireNonNull(
            AngularJSToReact.class.getResource("/sourceRoot/todoComponent.js")
    ).getPath();

    @Test
    void testHelp() throws IOException {
        Assertions.assertTrue(new AngularJSToReact().help().contains("ng2r [command]"));
    }

    @Nested
    class WhenAFileIsSearched {
        private Ng2rSearchResult result;

        @BeforeEach
        void doSearch() throws IOException {
            Ng2rSearchOptions options = new Ng2rSearchOptions()
                    .withFile(TODO_COMPONENT);
            result = new AngularJSToReact()
                    .search(options);
        }

        @Test
        void thenFoundComponentsAreReturned() {
            Assertions.assertEquals(1, result.getResult().size());
            Assertions.assertEquals("todoList", result.getResult().get(0).getName());
        }
    }
}