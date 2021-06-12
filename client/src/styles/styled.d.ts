import 'styled-components';
import theme from './theme';

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    title: string;

    colors: {
      background: string;
      popover: string;
      hover: string;
      blue: string;
      blueLight: string;
      blueLight02: string;
      shape: string;
      shape02: string;

      buttons: string;
      inputs: string;
      textTitle: string;
      textBody: string;

      borderColor: string;
      borderInputHover: string;

      green: string;
      red: string;
      white: string;
    };
  }
}
