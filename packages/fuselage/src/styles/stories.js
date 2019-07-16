import centered from '@storybook/addon-centered/react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import cssVars from 'css-vars-ponyfill';
import React from 'react';
import { Helmet } from 'react-helmet';

import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import colorPalette from './colorPalette.scss';
import colorPaletteNotes from './colorPalette.md';
import themingNotes from './theming.md';


cssVars({
  onlyLegacy: true,
  watch: true,
});

storiesOf('Styles|Theming', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .addParameters({
    notes: themingNotes,
  })
  .add('example', () => (
    <>
      <Helmet>
        <style type='text/css'>{`
        :root {
          --rcx-button-primary-background-color: navy;
          --rcx-button-danger-background-color: tomato;
        }
        `}</style>
      </Helmet>
      <ButtonGroup>
        <Button primary>Yes</Button>
        <Button>Maybe</Button>
        <Button danger>No</Button>
      </ButtonGroup>
    </>
  ), { notes: themingNotes })
  .add('color palette', () => (
    <div style={{ width: '100%', display: 'flex', flexFlow: 'row wrap' }}>
      {Object.entries(colorPalette.locals).map(([name, color], key) => (
        <div
          key={key}
          style={{ width: '2rem', height: '2rem', margin: '0.5rem', flex: '2', backgroundColor: color }}
          title={`${ name } (${ color })`}
        />
      ))}
    </div>
  ), { notes: colorPaletteNotes.replace('[](#color-palette-table)', () => {
    const maximumNameLenght = Object.keys(colorPalette.locals)
      .reduce((a, b) => (a.length > b.length ? a.length : b.length), 0);
    const header = [
      `| ${ 'Name'.padEnd(maximumNameLenght + 4, ' ') } | Color     |`,
      `|${ '-'.repeat(maximumNameLenght + 6) }|           |`,
    ];
    const rows = Object.entries(colorPalette.locals).map(([name, color]) => {
      const colorSquare = `<span style="display: inline-block; border: 0.5rem solid ${ color }"></span>`;
      return `| \`--${ name.padEnd(maximumNameLenght, ' ') }\` | ${ colorSquare } \`${ color }\``;
    });

    return `${ header.join('\n') }\n${ rows.join('\n') }`;
  }) });
