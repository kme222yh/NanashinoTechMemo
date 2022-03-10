<?php
$viteSrcUrl = '/wp-content/themes/nanashinotechmemo/dist/';

function vite(string $entry): string
{
    return "\n" . jsTag($entry)
        . "\n" . jsPreloadImports($entry)
        . "\n" . cssTag($entry);
}


// Helpers to print tags

function jsTag(string $entry): string
{
    $url = assetUrl($entry);

    if (!$url) {
        return '';
    }
    return '<script type="module" crossorigin src="' . $url . '"></script>';
}

function jsPreloadImports(string $entry): string
{
    $res = '';
    foreach (importsUrls($entry) as $url) {
        $res .= '<link rel="modulepreload" href="' . $url . '">';
    }
    return $res;
}

function cssTag(string $entry): string
{
    $tags = '';
    foreach (cssUrls($entry) as $url) {
        $tags .= '<link rel="stylesheet" href="' . $url . '">';
    }
    return $tags;
}


// Helpers to locate files

function getManifest(): array
{
    $content = file_get_contents(__DIR__ . '/dist/manifest.json');
    return json_decode($content, true);
}

function assetUrl(string $entry): string
{
    global $viteSrcUrl;
    $manifest = getManifest();
    return isset($manifest[$entry])
        ? $viteSrcUrl . $manifest[$entry]['file']
        : '';
}

function importsUrls(string $entry): array
{
    global $viteSrcUrl;
    $urls = [];
    $manifest = getManifest();

    if (!empty($manifest[$entry]['imports'])) {
        foreach ($manifest[$entry]['imports'] as $imports) {
            $urls[] = $viteSrcUrl . $manifest[$imports]['file'];
        }
    }
    return $urls;
}

function cssUrls(string $entry): array
{
    global $viteSrcUrl;
    $urls = [];
    $manifest = getManifest();

    if (!empty($manifest[$entry]['css'])) {
        foreach ($manifest[$entry]['css'] as $file) {
            $urls[] = $viteSrcUrl . $file;
        }
    }
    return $urls;
}
