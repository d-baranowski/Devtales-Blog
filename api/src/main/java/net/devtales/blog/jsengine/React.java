package net.devtales.blog.jsengine;

import jdk.nashorn.api.scripting.JSObject;
import jdk.nashorn.api.scripting.NashornScriptEngine;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

@Component
@Slf4j
public class React {
    private final ThreadLocal<NashornScriptEngine> engineHolder;

    public React(JsBundleResolver resolver) {
        this.engineHolder = ThreadLocal.withInitial(() -> {
            NashornScriptEngine nashornScriptEngine = (NashornScriptEngine) new ScriptEngineManager().getEngineByName("nashorn");
            try {
                nashornScriptEngine.eval(resolver.resolveFile("static/js/polyfill.js"));
                nashornScriptEngine.eval(resolver.resolveFile("static/js/server-bundle.js"));
                //http://redux.js.org/docs/recipes/ServerRendering.html
                nashornScriptEngine.eval("function renderServer(url, preState) { return MyApp['default'](url, preState); }");
            } catch (ScriptException e) {
                throw new RuntimeException(e);
            }
            return nashornScriptEngine;
        });
    }

    public JSObject render(String url, String preState) {
        try {
            long startTime = System.currentTimeMillis();
            JSObject result = (JSObject) engineHolder.get().invokeFunction("renderServer", url, preState);
            long endTime = System.currentTimeMillis();
            log.info("React rendering took {} milliseconds", endTime - startTime);
            return result;
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }


}