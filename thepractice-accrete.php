<?php
namespace Grav\Theme;

use Grav\Common\Theme;

/**
 * The Practice Accrete — standalone Grav 2 theme (no Quark inheritance).
 */
class ThepracticeAccrete extends Theme
{
    public static function getSubscribedEvents(): array
    {
        return [
            'onThemeInitialized' => ['onThemeInitialized', 0],
        ];
    }

    public function onThemeInitialized(): void
    {
        if ($this->isAdmin()) {
            return;
        }

        $this->enable([
            'onAssetsInitialized' => ['onAssetsInitialized', 0],
        ]);
    }

    public function onAssetsInitialized(): void
    {
        $assets = $this->grav['assets'];

        $assets->addCss('theme://css/main.css', 100);
        $assets->addCss('theme://css/style.css', 95);
        $assets->addCss('theme://css/custom.css', 90);

        $assets->addJs('theme://js/main.js', [
            'group' => 'bottom',
            'priority' => 100,
        ]);
        $assets->addJs('theme://js/custom.js', [
            'group' => 'bottom',
            'priority' => 90,
        ]);
    }
}
