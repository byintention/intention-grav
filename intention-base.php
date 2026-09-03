<?php
namespace Grav\Theme;

use Grav\Common\Theme;
use Twig\TwigFunction;

/**
 * Intention base — standalone Grav 2 theme (no Quark inheritance).
 */
class IntentionBase extends Theme
{
    public static function getSubscribedEvents(): array
    {
        return [
            'onThemeInitialized' => ['onThemeInitialized', 0],
        ];
    }

    public function onThemeInitialized(): void
    {
        $this->enable([
            'onTwigInitialized' => ['onTwigInitialized', 0],
        ]);

        if ($this->isAdmin()) {
            return;
        }

        $this->enable([
            'onAssetsInitialized' => ['onAssetsInitialized', 0],
        ]);
    }

    public function onTwigInitialized(): void
    {
        $this->grav['twig']->twig()->addFunction(
            new TwigFunction('contrast_ratio', [self::class, 'contrastRatio'])
        );
    }

    /**
     * WCAG relative-luminance contrast ratio between two hex colours.
     */
    public static function contrastRatio(string $color1, string $color2): float
    {
        $l1 = self::relativeLuminance(self::hexToRgb($color1));
        $l2 = self::relativeLuminance(self::hexToRgb($color2));

        if ($l1 > $l2) {
            return ($l1 + 0.05) / ($l2 + 0.05);
        }

        return ($l2 + 0.05) / ($l1 + 0.05);
    }

    /** @return array{0: int, 1: int, 2: int} */
    private static function hexToRgb(string $hex): array
    {
        $hex = ltrim(trim($hex), '#');
        if (strlen($hex) === 3) {
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        }
        if (strlen($hex) !== 6 || !ctype_xdigit($hex)) {
            return [0, 0, 0];
        }

        return [
            hexdec(substr($hex, 0, 2)),
            hexdec(substr($hex, 2, 2)),
            hexdec(substr($hex, 4, 2)),
        ];
    }

    /** @param array{0: int, 1: int, 2: int} $rgb */
    private static function relativeLuminance(array $rgb): float
    {
        $channels = array_map(static function (int $c): float {
            $v = $c / 255;
            return ($v <= 0.03928) ? $v / 12.92 : (($v + 0.055) / 1.055) ** 2.4;
        }, $rgb);

        return 0.2126 * $channels[0] + 0.7152 * $channels[1] + 0.0722 * $channels[2];
    }

    public function onAssetsInitialized(): void
    {
        $assets = $this->grav['assets'];

        $assets->addCss('theme://css/style.css', 100);

        $assets->addJs('theme://js/theme-toggle.js', [
            'group' => 'head',
            'priority' => 100,
        ]);

        $assets->addJs('theme://js/main.js', [
            'group' => 'bottom',
            'priority' => 100,
        ]);
    }
}
