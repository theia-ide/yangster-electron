# yangster-electron

[![Build Status](https://travis-ci.org/theia-ide/yangster-electron.svg?branch=master)](https://travis-ci.org/theia-ide/yangster-electron)
[![Build status](https://ci.appveyor.com/api/projects/status/vx1e99g4ey9m73as/branch/master?svg=true)](https://ci.appveyor.com/project/kittaakos/yangster-electron/branch/master)
Bundled Yangster electron application

### Quick start

```bash
git clone https://github.com/theia-ide/yangster-electron.git \
&& cd yangster-electron \
&& yarn
```

The bundled applications will be available under the `dist` folder.

### Troubleshooting

[_"Don't expect that you can build app for all platforms on one platform."_](https://www.electron.build/multi-platform-build)

Install `glib` on OS X with `brew install glib` or update it with `brew upgrade glib` if you see:
```
dyld: Library not loaded: /usr/local/opt/glib/lib/libglib-2.0.0.dylib
Referenced from: /Users/username/Library/Caches/electron-builder/appimage/appimage-9.0.1/darwin/appimagetool
Reason: Incompatible library version: appimagetool requires version 5401.0.0 or later, but libglib-2.0.0.dylib provides version 5001.0.0
```

Install `wine` on OS X by running `brew install wine` if you see:
```
Error: Cannot check wine version: Error: Exit code: ENOENT. spawn wine ENOENT