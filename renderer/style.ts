import { css } from "@linaria/core"

css`/* global */
   * {
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
   }
   :root {
      background-color: black;
      color: white;
   }
   body {
      margin: 0;
      padding: 8px;
   }
   :root, body {
      min-height: 100vh;
      min-width: 100vw;
   }
   a {
      text-decoration: none;
      &:not(:visited) {
         color: inherit;
      }
      &:visited {
         color: #a57ee7;
      }
      &:active {
         color: indianred;
      }
      &:hover {
        color: #a1a1a1a2;
      }
   }
   code {
      font-family: 'Consolas', monospace;
   }
   pre { white-space:pre }
`

css`/* global */
@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Semibold Italic'), local('SegoeUI-SemiboldItalic'),
        url('public/subset-SegoeUI-SemiboldItalic.woff2') format('woff2');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI Semilight';
    src: local('Segoe UI Semilight'), local('SegoeUI-Semilight'),
        url('public/subset-SegoeUI-Semilight.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI Semilight';
    src: local('Segoe UI Semilight Italic'), local('SegoeUI-SemilightItalic'),
        url('public/subset-SegoeUI-SemilightItalic.woff2') format('woff2');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI'), local('SegoeUI'),
        url('public/subset-SegoeUI.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Light Italic'), local('SegoeUI-LightItalic'),
        url('public/subset-SegoeUI-LightItalic.woff2') format('woff2');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Semibold'), local('SegoeUI-Semibold'),
        url('public/subset-SegoeUI-Semibold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Black Italic'), local('SegoeUIBlack-Italic'),
        url('public/subset-SegoeUIBlack-Italic.woff2') format('woff2');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Bold Italic'), local('SegoeUI-BoldItalic'),
        url('public/subset-SegoeUI-BoldItalic.woff2') format('woff2');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Black'), local('SegoeUIBlack'),
        url('public/subset-SegoeUIBlack.woff2') format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Light'), local('SegoeUI-Light'),
        url('public/subset-SegoeUI-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Italic'), local('SegoeUI-Italic'),
        url('public/subset-SegoeUI-Italic.woff2') format('woff2');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Segoe UI';
    src: local('Segoe UI Bold'), local('SegoeUI-Bold'),
        url('public/subset-SegoeUI-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Consolas';
    src: local('Consolas Italic'), local('Consolas-Italic'),
        url('public/subset-Consolas-Italic.woff2') format('woff2');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Consolas';
    src: local('Consolas Bold'), local('Consolas-Bold'),
        url('public/subset-Consolas-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Consolas';
    src: local('Consolas Bold Italic'), local('Consolas-BoldItalic'),
        url('public/subset-Consolas-BoldItalic.woff2') format('woff2');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
}

@font-face {
    font-family: 'Consolas';
    src: local('Consolas'),
        url('public/subset-Consolas.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}
`