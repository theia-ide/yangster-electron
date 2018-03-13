# yangster-electron
[![Build Status](https://travis-ci.org/theia-ide/yangster-electron.svg?branch=master)](https://travis-ci.org/theia-ide/yangster-electron)
[![Build status](https://ci.appveyor.com/api/projects/status/vx1e99g4ey9m73as/branch/master?svg=true)](https://ci.appveyor.com/project/kittaakos/yangster-electron/branch/master)

Yangster electron application

### Try it out
The executable artifacts can be downloaded from [here](https://github.com/theia-ide/yangster-electron/releases/latest).

### Prerequisites
 - Node.js 8+
 - yarn 1.2.1+
 - Git 2.11+
 - Java 8+ (Currently, Java 9 is not supported.)
 - Python 2.7.x (Python 3, is not supported.)

### Quick start
```bash
git clone https://github.com/theia-ide/yangster-electron.git \
&& cd yangster-electron \
&& yarn \
&& yarn build \
&& yarn package
```

The bundled applications will be available under the `dist` folder.

### Publishing a new release
 - Go to the [`releases`](https://github.com/theia-ide/yangster-electron/releases) page and select the `Draft a new release` button.
 - Set the desired version and select the target branch. The version should match the `v\d+\.\d+\.\d+` patten. For instance, `v2.12.4`. By default, the target branch is `master`, which is fine for our use-case.
 - Select `Save draft`.
 - Update the product version in the `package.json`. The new version should match with the previously configured version of the draft release. Note, the leading `v` should be omitted from the version in the `package.json`.
 - Commit your changes and push to the remote.
 - CIs will automatically start a new build with your most recent modifications. Once the builds are green, the artifacts will be uploaded and attached by the CIs to your release.
 - Go the `releases` page and select your release draft you would like to finalize. Select `edit`.
 - Here, you can make some additional changes. You can remove exisiting artifacts or even upload additional ones manually. When you are ready, select `Publish release`. 
 - :sparkles:

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
```

Set the `VCTargetsPath` environment variable with `SET VCTargetsPath=path\to\MSBuild\Microsoft.Cpp\v4.0\v140`, and do `npm config set msvs_version 2017 --global` if you are facing with the following error on Windows:

```
error MSB4019: The imported project "some\invalid\path\Microsoft.Cpp.Default.props" was not found. Confirm that the path in the <Import> declaration is correct, and that t he file exists on disk.
```
