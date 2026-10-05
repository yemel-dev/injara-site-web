//15.261.0-es2019 (f44ba6403a848)
var CS_CONF={"collectionEnabled":true,"projectId":656184,"status":1,"hostnames":[""],"crossDomainTracking":0,"crossDomainSingleIframeTracking":0,"consentRequired":0,"allowSubdomains":1,"visitorCookieTimeout":34164000000,"sampleRate":100,"replayRecordingRate":100,"validationRate":10,"lastTrackingDraw":null,"trackerDomain":"c.ba.contentsquare.net","recordingDomain":"r.contentsquare.net","useMalkaPipeline":1,"malkaQuotaServiceDomain":"q.ba.contentsquare.net","malkaRecordingDomain":"k.ba.contentsquare.net","ed":"l.contentsquare.net/log/web","eMerchandisingEnabled":0,"mouseMoveHeatmapEnabled":1,"jsErrorsEnabled":1,"customErrorsEnabled":0,"jsCustomErrorsEnabled":0,"apiErrorsEnabled":0,"customHashIdEnabled":0,"recordingEncryptionEnabled":0,"recordingEncryptionPublicKey":null,"recordingEncryptionPublicKeyId":0,"secureCookiesEnabled":1,"triggerSessionReplayEnabled":0,"triggerSessionReplayRegex":null,"dynamicIdRegex":null,"whitelistedAttributes":null,"replayRecordingUnmaskedUrlRegex":null,"replayRecordingUnmaskedUrlRegexRules":[],"replayRecordingMaskedUrlRegexRules":[],"replayRecordingMaskedUrlRegex":null,"anonymisationMethod":null,"anonymizeDigits":false,"tagDeploymentMode":"CONTENTSQUARE","experimental":null,"iframesTracking":0,"textVisibilityEnabled":0,"cookielessTrackingEnabled":0,"malkaUrlEnabled":0,"malkaEtrEnabled":0,"pathComputationRules":{},"asyncSerializerEnabled":1,"pendingInactivityTimeout":5000,"accessibilityEnabled":0,"taskSchedulerOptions":{"enabled":1},"uxaDomain":"app.contentsquare.com","webviewsTrackingEnabled":0,"staticResourceManagerDomain":"srm.ba.contentsquare.net","useStaticResourceManager":1,"performanceTimingOptions":{"withResource":false,"withNavigation":false},"replayConsentRequiredForSession":0,"displayAdOptions":null,"voc":{"siteId":null,"enabled":0},"implementations":[{"template":{"name":"ArtificialPageview","args":{}},"triggers":[{"name":"HistoryChange","args":{"listeners":"popstate, pushState, replaceState","useDebounce":"no","window":400}}]}],"eventsApiEnabled":0,"dynamicConfDomain":"t.contentsquare.net/settings","collectHierarchy":0,"collectSubmit":0,"collectTargetText":1,"tagVerificationDomain":"tcvsapi.contentsquare.com","tagVerificationEnabled":true,"startMode":1,"quotas":[{"quotaType":"ANALYTICS","value":0},{"quotaType":"RECORDING","value":0}],"trackingCodeVerified":true,"experiments":{"list":[]},"isLegacyHJ":false,"maskMedia":false,"urlBlacklist":null,"useBootstrapFile":true};
function injectTag(stable, candidate, share) {
  if (typeof CS_CONF === "undefined") {
    return;
  }
  const d2 = document;
  const logUrl = `https://${CS_CONF.ed}`;
  const pid = CS_CONF.projectId;
  function log2(message2, level = "critical") {
    const page = location.origin + location.pathname;
    const msg = `${logUrl}?a=uxa&l=${level}&m=${encodeURIComponent(message2)}&pid=${pid}&p=${encodeURIComponent(page)}`;
    fetch(msg, { mode: "cors", credentials: "omit", keepalive: true }).catch(
      () => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = msg;
      }
    );
  }
  const currentScript = document.currentScript;
  const hjDomains = ["static-integration.hotjar.com", "static.hotjar.com"];
  const isHotjar = hjDomains.some((x2) => currentScript?.src.includes(x2));
  const origin = isHotjar ? new URL(currentScript.src).origin : "https://t.contentsquare.net";
  const rollout = candidate && share ? { arm: Math.random() < share ? "candidate" : "stable" } : null;
  CS_CONF.rollout = rollout;
  const path2 = rollout?.arm === "candidate" && candidate ? candidate : stable;
  const expectedSrc = new URL(`${origin}/${path2}`).href;
  const element = d2.createElement("script");
  let stopped = false;
  let errorTimer;
  const observer = new MutationObserver((records) => checkAttributes(records));
  function cleanup() {
    stopped = true;
    clearTimeout(errorTimer);
    observer.disconnect();
    d2.removeEventListener("securitypolicyviolation", onCsp);
    element.onload = null;
    element.onerror = null;
  }
  function report(cause) {
    log2(`Bootstrap error: ${cause}`);
  }
  function checkAttributes(records = observer.takeRecords()) {
    if (stopped) return true;
    for (const attribute of ["src", "type"]) {
      const expected = attribute === "src" ? expectedSrc : null;
      const observed = element.getAttribute(attribute);
      if (attribute === "src" && element.src !== expectedSrc || observed !== expected || records.some(
        (record) => record.attributeName === attribute && record.oldValue !== expected
      )) {
        cleanup();
        report(`${attribute} changed observed=${JSON.stringify(observed)}`);
        return true;
      }
    }
    return false;
  }
  function onCsp(event) {
    if (stopped || !event.isTrusted || event.disposition !== "enforce" || !["script-src", "script-src-elem"].includes(event.effectiveDirective) || event.blockedURI !== expectedSrc && !(event.target === element && event.blockedURI === origin)) {
      return;
    }
    if (checkAttributes()) return;
    cleanup();
    report(
      `csp blocked directive=${event.effectiveDirective} blockedURI=${event.blockedURI}`
    );
  }
  d2.addEventListener("securitypolicyviolation", onCsp);
  element.onload = () => {
    if (!checkAttributes()) cleanup();
  };
  element.onerror = () => {
    if (checkAttributes() || errorTimer !== void 0) return;
    errorTimer = setTimeout(() => {
      if (checkAttributes()) return;
      cleanup();
      report("others");
    }, 0);
  };
  try {
    element.src = expectedSrc;
    element.async = true;
    element.fetchPriority = "high";
    element.crossOrigin = "anonymous";
    if (!checkAttributes()) {
      observer.observe(element, {
        attributes: true,
        attributeFilter: ["src", "type"],
        attributeOldValue: true
      });
    }
    (d2.head || d2.documentElement).appendChild(element);
    checkAttributes();
  } catch (error2) {
    cleanup();
    throw error2;
  }
}
injectTag("releases/15.261.0/es2019/1300104-d4783973.js");

// signature-ee1e922f19bc4753ef13e03c6e9b180bfaf7384f4c5bf85ae0cfe08284e5939f