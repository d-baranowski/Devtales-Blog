package net.devtales.blog;

import net.devtales.blog.nashorn.React;
import org.junit.Test;



/**
 * Created by Daniel on 20/06/2017.
 */
public class NashornTest {

    @Test
    public void sanityCheck() {
        React react = new React();
        System.out.print(react.render());
    }
}
