# Quick Fix: npm 2FA Required Error

## 🚨 Error You're Seeing

```
403 Forbidden - Two-factor authentication or granular access token with bypass 2fa enabled is required to publish packages.
```

## ✅ Quick Fix (Choose One)

### Method 1: Enable 2FA (2 minutes)

1. **Go to npm settings:**
   ```
   https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   ```
   (Replace YOUR_USERNAME with your npm username)

2. **Enable 2FA:**
   - Click "Enable 2FA" or "Edit Profile"
   - Choose "Authorization" mode
   - Scan QR code with Google Authenticator/Authy
   - Enter 6-digit code to confirm

3. **Publish again:**
   ```bash
   npm publish
   ```
   - When prompted, enter code from authenticator app

### Method 2: Create Access Token (1 minute)

1. **Create token:**
   - Go to: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   - Click "Generate New Token"
   - Select "Granular Access Token"
   - Enable "Bypass 2FA"
   - Copy the token

2. **Add to .npmrc:**
   ```bash
   echo "//registry.npmjs.org/:_authToken=YOUR_TOKEN_HERE" >> ~/.npmrc
   chmod 600 ~/.npmrc
   ```

3. **Publish:**
   ```bash
   npm publish
   ```

### Method 3: Use npm CLI

```bash
# Enable 2FA via command line
npm profile enable-2fa auth-and-writes

# Follow prompts (scan QR, enter code)

# Then publish
npm publish
```

## 🎯 Recommended: Method 1 (2FA)

2FA is more secure and is the standard for npm publishing.

**Steps:**
1. Open https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Enable 2FA
3. Use authenticator app
4. Run `npm publish` again

---

**That's it!** Once 2FA is enabled, `npm publish` will work. 🚀
