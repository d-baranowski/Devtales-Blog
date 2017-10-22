package net.devtales.commons.nashorn;

import jdk.nashorn.api.scripting.JSObject;
import jdk.nashorn.api.scripting.NashornScriptEngine;

import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

public class React {

    private ThreadLocal<NashornScriptEngine> engineHolder = ThreadLocal.withInitial(() -> {
        NashornScriptEngine nashornScriptEngine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
        try {
            nashornScriptEngine.eval(resolveFile("static/js/polyfill.js"));
            nashornScriptEngine.eval(resolveFile("static/js/server-bundle.js"));
            //http://redux.js.org/docs/recipes/ServerRendering.html
            nashornScriptEngine.eval("function renderServer(url, preState) { return MyApp['default'](url, preState); }");
        } catch (ScriptException e) {
            throw new RuntimeException(e);
        }
        return nashornScriptEngine;
    });

    public JSObject render(String url, String preState) {
        try {
            return (JSObject) engineHolder.get().invokeFunction("renderServer", url, preState);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }

    private Reader resolveFile(String path) {
        InputStream in = getClass().getClassLoader().getResourceAsStream(path);
        return new InputStreamReader(in);
    }
}