export const SECURITY_ACTIONS = {
    DISABLE_MFA: {
        key: 'disableMfa',
        title: 'Disable Two-Factor Authentication?',
        message: 'The user will sign in using only their password.',
        confirmText: 'Disable MFA',
        confirmClass: 'btn-danger',
        icon: 'mdi-shield-off-outline',
        loadingText: 'Disabling...',
        buttonTitle: 'Disable Multi-Factor Authentication'
    },

    ENABLE_MFA: {
        key: 'enableMfa',
        title: 'Enable Two-Factor Authentication?',
        message: 'The user will be required to enter a verification code when signing in.',
        confirmText: 'Enable MFA',
        confirmClass: 'btn-success',
        icon: 'mdi-shield-check-outline',
        loadingText: 'Enabling...',
        buttonTitle: 'Enable Multi-Factor Authentication'
    },

    DISABLE_NEW_DEVICE_OTP: {
        key: 'disableNewDeviceOtp',
        title: 'Disable New Device Verification?',
        message: 'The user will no longer be asked to verify new devices during sign-in.',
        confirmText: 'Disable Verification',
        confirmClass: 'btn-danger',
        icon: 'mdi-cellphone-remove',
        loadingText: 'Disabling...',
        buttonTitle: 'Disable New Device Verification'
    },

    ENABLE_NEW_DEVICE_OTP: {
        key: 'enableNewDeviceOtp',
        title: 'Enable New Device Verification?',
        message: 'The user will be required to verify their identity when signing in from a new device.',
        confirmText: 'Enable Verification',
        confirmClass: 'btn-success',
        icon: 'mdi-cellphone-check',
        loadingText: 'Enabling...',
        buttonTitle: 'Enable New Device Verification'
    },

    ENABLE_MULTI_DEVICE: {
        key: 'enableMultiDevice',
        title: 'Allow Multiple Device Logins?',
        message: 'The user will be able to sign in from multiple devices simultaneously.',
        confirmText: 'Allow Devices',
        confirmClass: 'btn-success',
        icon: 'mdi-devices',
        loadingText: 'Saving...',
        buttonTitle: 'Allow Multiple Device Logins'
    },

    DISABLE_MULTI_DEVICE: {
        key: 'disableMultiDevice',
        title: 'Restrict to a Single Device?',
        message: 'Signing in on a new device may automatically end existing active sessions.',
        confirmText: 'Restrict Devices',
        confirmClass: 'btn-danger',
        icon: 'mdi-cellphone-off',
        loadingText: 'Saving...',
        buttonTitle: 'Restrict Multiple Device Logins'
    },

    DEACTIVATE_USER: {
        key: 'deactivateUser',
        title: 'Deactivate User?',
        message: 'The user will immediately lose access to the system until the account is reactivated.',
        confirmText: 'Deactivate User',
        confirmClass: 'btn-danger',
        icon: 'mdi-account-cancel-outline',
        loadingText: 'Deactivating...',
        buttonTitle: 'Deactivate User'
    },

    ACTIVATE_USER: {
        key: 'activateUser',
        title: 'Activate User?',
        message: 'The user will regain access to the system and be able to sign in.',
        confirmText: 'Activate User',
        confirmClass: 'btn-success',
        icon: 'mdi-account-check-outline',
        loadingText: 'Activating...',
        buttonTitle: 'Activate User'
    },

    DELETE_USER: {
        key: 'deleteUser',
        title: 'Delete User?',
        message: 'This action is permanent and cannot be undone.',
        confirmText: 'Delete User',
        confirmClass: 'btn-danger',
        icon: 'mdi-delete-outline',
        loadingText: 'Deleting...',
        buttonTitle: 'Delete User'
    }
}