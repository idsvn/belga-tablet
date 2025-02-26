import React from 'react';

import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
  RenderHTMLProps,
} from 'react-native-render-html';

import { widthScreen } from 'src/utils/systemUtils';

import theme from 'src/themes';

interface RenderHTMLCustomProps extends RenderHTMLProps {
  fontSize?: number;
}

const RenderHTMLCustom: React.FC<RenderHTMLCustomProps> = ({
  fontSize = 14,
  ...props
}) => {
  return (
    <RenderHTML
      contentWidth={widthScreen}
      customHTMLElementModels={{
        p: HTMLElementModel.fromCustomModel({
          tagName: 'blue-circle',
          mixedUAStyles: {
            fontFamily: theme.fontFamily.regular,
            color: theme.colors.textPrimary,
            fontSize: fontSize + 2,
            lineHeight: fontSize * 1.4,
          },
          contentModel: HTMLContentModel.block,
        }),
        strong: HTMLElementModel.fromCustomModel({
          tagName: 'blue-circle',
          mixedUAStyles: {
            fontFamily: theme.fontFamily.regular,
            color: theme.colors.textPrimary,
            lineHeight: fontSize * 1.4,
          },
          contentModel: HTMLContentModel.block,
        }),
        h1: HTMLElementModel.fromCustomModel({
          tagName: 'blue-circle',
          mixedUAStyles: {
            fontFamily: theme.fontFamily.regular,
            color: theme.colors.textPrimary,
            lineHeight: fontSize * 1.4,
          },
          contentModel: HTMLContentModel.block,
        }),
        h2: HTMLElementModel.fromCustomModel({
          tagName: 'blue-circle',
          mixedUAStyles: {
            fontFamily: theme.fontFamily.regular,
            color: theme.colors.textPrimary,
            lineHeight: fontSize * 1.4,
          },
          contentModel: HTMLContentModel.block,
        }),
      }}
      systemFonts={[theme.fontFamily.regular]}
      enableExperimentalMarginCollapsing={true}
      {...props}
    />
  );
};

export default RenderHTMLCustom;
