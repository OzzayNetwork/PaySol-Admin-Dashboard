export function getDeviceIcon(value = '') {
    const text = value.toLowerCase().trim()

    // ===== Browsers =====
    if (text.includes('chrome')) return 'logos:chrome'
    if (text.includes('chromium')) return 'logos:chromium'
    if (text.includes('edge')) return 'logos:microsoft-edge'
    if (text.includes('firefox')) return 'logos:firefox'
    if (text.includes('safari')) return 'logos:safari'
    if (text.includes('opera gx')) return 'simple-icons:operagx'
    if (text.includes('opera')) return 'logos:opera'
    if (text.includes('brave')) return 'logos:brave-icon'
    if (text.includes('vivaldi')) return 'logos:vivaldi-icon'
    if (text.includes('arc')) return 'simple-icons:arc'
    if (text.includes('internet explorer')) return 'logos:internet-explorer'
    if (text.includes('ie')) return 'logos:internet-explorer'
    if (text.includes('Unknown')) return 'streamline-ultimate:network-browser-bold'

    // ===== API Clients =====
    if (text.includes('postman')) return 'logos:postman-icon'
    if (text.includes('insomnia')) return 'simple-icons:insomnia'
    if (text.includes('hoppscotch')) return 'simple-icons:hoppscotch'
    if (text.includes('curl')) return 'mdi:console'
    if (text.includes('wget')) return 'mdi:download'
    if (text.includes('axios')) return 'simple-icons:axios'

    // ===== Operating Systems =====
    if (text.includes('windows')) return 'logos:microsoft-windows'
    if (text.includes('mac')) return 'logos:apple'
    if (text.includes('ios')) return 'logos:apple'
    if (text.includes('iphone')) return 'logos:apple'
    if (text.includes('ipad')) return 'logos:apple'
    if (text.includes('android')) return 'logos:android-icon'
    if (text.includes('ubuntu')) return 'logos:ubuntu'
    if (text.includes('debian')) return 'logos:debian'
    if (text.includes('fedora')) return 'logos:fedora'
    if (text.includes('arch')) return 'logos:archlinux'
    if (text.includes('linux')) return 'logos:linux-tux'
    if (text.includes('chrome os')) return 'logos:chrome'

    // ===== Devices =====
    if (text.includes('desktop')) return 'mdi:monitor'
    if (text.includes('laptop')) return 'mdi:laptop'
    if (text.includes('notebook')) return 'mdi:laptop'
    if (text.includes('mobile')) return 'mdi:cellphone'
    if (text.includes('phone')) return 'mdi:cellphone'
    if (text.includes('smartphone')) return 'mdi:cellphone'
    if (text.includes('tablet')) return 'mdi:tablet'
    if (text.includes('watch')) return 'mdi:watch-variant'
    if (text.includes('tv')) return 'mdi:television'
    if (text.includes('server')) return 'mdi:server'
    if (text.includes('bot')) return 'mdi:robot'

    return 'streamline-ultimate:network-browser-bold'
}