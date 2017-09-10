package net.devtales.blog;

import net.devtales.commons.nashorn.React;
import org.junit.Assert;
import org.junit.Test;



public class NashornTest {

    @Test
    public void sanityCheck() {
        React react = new React();
        Assert.assertTrue(react.render().contains("div"));
    }
}
