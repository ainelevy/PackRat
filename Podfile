require File.join(File.dirname(`node --print "require.resolve('expo/package.json')"`), "scripts/autolinking")
require File.join(File.dirname(`node --print "require.resolve('react-native/package.json')"`), "scripts/react_native_pods")
require File.join(File.dirname(`node --print "require.resolve('@react-native-community/cli-platform-ios/package.json')"`), "native_modules")

require 'json'
podfile_properties = JSON.parse(File.read(File.join(__dir__, 'Podfile.properties.json'))) rescue {}

ENV['RCT_NEW_ARCH_ENABLED'] = podfile_properties['newArchEnabled'] == 'true' ? '1' : '0'

platform :ios, podfile_properties['ios.deploymentTarget'] || '13.0'
install! 'cocoapods',
  :deterministic_uuids => false

prepare_react_native_project!

# If you are using a `react-native-flipper` your iOS build will fail when `NO_FLIPPER=1` is set.
# because `react-native-flipper` depends on (FlipperKit,...), which will be excluded. To fix this,
# you can also exclude `react-native-flipper` in `react-native.config.js`
#
# ```js
# module.exports = {
#   dependencies: {
#     ...(process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {}),
#   }
# }
# ```
flipper_config = FlipperConfiguration.disabled
if ENV['NO_FLIPPER'] == '1' then
  # Explicitly disabled through environment variables
  flipper_config = FlipperConfiguration.disabled
elsif podfile_properties.key?('ios.flipper') then
  # Configure Flipper in Podfile.properties.json
  if podfile_properties['ios.flipper'] == 'true' then
    flipper_config = FlipperConfiguration.enabled(["Debug", "Release"])
  elsif podfile_properties['ios.flipper'] != 'false' then
    flipper_config = FlipperConfiguration.enabled(["Debug", "Release"], { 'Flipper' => podfile_properties['ios.flipper'] })
  end
end

# @generated begin @rnmapbox/maps-rnmapboxmapsimpl - expo prebuild (DO NOT MODIFY) sync-a3ff464a3a14b329676ad3480093081bb97a1930
$RNMapboxMapsImpl = 'mapbox'
$RNMapboxMapsDownloadToken = 'MAPBOX_DOWNLOADS_TOKEN_FROM_ENV'
# @generated end @rnmapbox/maps-rnmapboxmapsimpl
target 'packrat' do
  use_expo_modules!
  config = use_native_modules!

  use_frameworks! :linkage => podfile_properties['ios.useFrameworks'].to_sym if podfile_properties['ios.useFrameworks']
  use_frameworks! :linkage => ENV['USE_FRAMEWORKS'].to_sym if ENV['USE_FRAMEWORKS']

  # Flags change depending on the env values.
  flags = get_default_flags()

# @generated begin pre_installer - expo prebuild (DO NOT MODIFY) sync-c8812095000d6054b846ce74840f0ffb540c2757
  pre_install do |installer|
# @generated begin @rnmapbox/maps-pre_installer - expo prebuild (DO NOT MODIFY) sync-ea4905840bf9fcea0acc62e92aa2e784f9d760f8
    $RNMapboxMaps.pre_install(installer)
# @generated end @rnmapbox/maps-pre_installer
  end
# @generated end pre_installer
  use_react_native!(
    :path => config[:reactNativePath],
    :hermes_enabled => podfile_properties['expo.jsEngine'] == nil || podfile_properties['expo.jsEngine'] == 'hermes',
    :fabric_enabled => flags[:fabric_enabled],
    # An absolute path to your application root.
    :app_path => "#{Pod::Config.instance.installation_root}/..",
    # Note that if you have use_frameworks! enabled, Flipper will not work if enabled
    :flipper_configuration => flipper_config
  )

  post_install do |installer|
# @generated begin @rnmapbox/maps-post_installer - expo prebuild (DO NOT MODIFY) sync-c4e8f90e96f6b6c6ea9241dd7b52ab5f57f7bf36
    $RNMapboxMaps.post_install(installer)
# @generated end @rnmapbox/maps-post_installer
    react_native_post_install(
      installer,
      config[:reactNativePath],
      # Set `mac_catalyst_enabled` to `true` in order to apply patches
      # necessary for Mac Catalyst builds
      :mac_catalyst_enabled => false
    )
    __apply_Xcode_12_5_M1_post_install_workaround(installer)

    # This is necessary for Xcode 14, because it signs resource bundles by default
    # when building for devices.
    installer.target_installation_results.pod_target_installation_results
      .each do |pod_name, target_installation_result|
      target_installation_result.resource_bundle_targets.each do |resource_bundle_target|
        resource_bundle_target.build_configurations.each do |config|
          config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
        end
      end
    end

    installer.pods_project.build_configurations.each do |config|
        config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
      end
    end

  post_integrate do |installer|
    begin
      expo_patch_react_imports!(installer)
    rescue => e
      Pod::UI.warn e
    end
  end
end
