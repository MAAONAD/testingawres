import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { rgba } from 'polished';

import { withStyles } from '../tools/withStyles';
import { Link } from '../components/Link';
import { Main } from '../components/Main';
import { Secuence } from '../components/Secuence';
import { Text } from '../components/Text';

const styles = theme => ({
  root: {},
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  subheader: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 16
  },
  toolsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: [0, 'auto'],
    maxWidth: 1100
  },
  toolItem: {
    margin: 8,
    width: 200,
    height: 50,
    border: `1px solid ${theme.color.secondary.main}`,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: [0, 15],
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: rgba(theme.color.secondary.main, 0.1),
      boxShadow: `0 0 8px ${rgba(theme.color.secondary.main, 0.5)}`
    }
  },
  toolSelected: {
    borderColor: theme.color.tertiary.main,
    backgroundColor: rgba(theme.color.tertiary.main, 0.1),
    '&:hover': {
      backgroundColor: rgba(theme.color.tertiary.main, 0.15),
      boxShadow: `0 0 8px ${rgba(theme.color.tertiary.main, 0.5)}`
    }
  },
  toolIcon: {
    display: 'inline-block',
    marginRight: 10,
    fontSize: 16
  },
  toolName: {
    display: 'inline-block',
    fontSize: 16,
    color: theme.color.text.main
  },
  buttonsContainer: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  },
  actionButton: {
    display: 'inline-block',
    margin: [0, 10],
    padding: [8, 20],
    border: `1px solid ${theme.color.secondary.main}`,
    color: theme.color.secondary.main,
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    fontSize: 14,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: rgba(theme.color.secondary.main, 0.1),
      boxShadow: `0 0 8px ${rgba(theme.color.secondary.main, 0.5)}`
    }
  }
});

class SolanaPage extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTools: {}
    };
  }
  
  componentDidMount() {
    window.addEventListener('route-change-start', this.onRouteChangeStart);
  }

  componentWillUnmount() {
    window.removeEventListener('route-change-start', this.onRouteChangeStart);
  }

  onRouteChangeStart = ({ detail: { isInternal } }) => {
    if (isInternal) {
      if (this.secuenceElement) {
        this.secuenceElement.exit();
      }
    }
  }

  toggleTool = (toolId) => {
    this.setState(prevState => ({
      selectedTools: {
        ...prevState.selectedTools,
        [toolId]: !prevState.selectedTools[toolId]
      }
    }));
  }

  handleCreateFolder = () => {
    const { selectedTools } = this.state;
    const selectedToolIds = Object.keys(selectedTools).filter(id => selectedTools[id]);
    
    console.log('Creating folder with tools:', selectedToolIds);
    alert('Your folder is being created with the selected tools!');
  }

  render() {
    const { classes } = this.props;
    const { selectedTools } = this.state;

    const tools = [
      { id: 'dex-paid', name: 'DEX Paid', icon: '💵' },
      { id: 'new-pf', name: 'New Presale Finder', icon: '❤️' },
      { id: 'koth-rise', name: 'KOTH Rise', icon: '🔶' },
      { id: '15k-mcap', name: '15K Market Cap', icon: '💲' },
      { id: '30k-mcap', name: '30K Market Cap', icon: '💹' },
      { id: '45k-mcap', name: '45K Market Cap', icon: '📈' },
      { id: 'ray-migration', name: 'Ray Migration', icon: '🔄' },
      { id: 'ct-tracker', name: 'CT Tracker', icon: '🔴' },
      { id: 'volume-monitor', name: 'Volume Monitor', icon: '📊' },
      { id: 'degen-algo', name: 'Degen Algorithm', icon: '📉' },
      { id: 'dex-cto-update', name: 'DEX CTO Update', icon: '❗' },
      { id: 'trencher-v1', name: 'Trencher v1', icon: '💚' },
      { id: 'telegram-scrapper', name: 'Telegram Scrapper', icon: '📱' },
      { id: '100k-mcap', name: '100K Market Cap', icon: '💰' },
      { id: '500k-mcap', name: '500K Market Cap', icon: '💰' },
      { id: '1m-mcap', name: '1M Market Cap', icon: '💰' },
    ];

    return (
      <Main className={classes.root}>
        <Secuence stagger ref={ref => (this.secuenceElement = ref)}>
          <header className={classes.header}>
            <h1><Text>SOLANA TOOLS SELECTION</Text></h1>
          </header>
          <p className={classes.subheader}>
            <Text>Select the tools you want to include in your custom folder</Text>
          </p>
          
          <div className={classes.toolsContainer}>
            {tools.map(tool => (
              <div 
                key={tool.id}
                className={cx(
                  classes.toolItem, 
                  selectedTools[tool.id] && classes.toolSelected
                )}
                onClick={() => this.toggleTool(tool.id)}
              >
                <span className={classes.toolIcon}>{tool.icon}</span>
                <span className={classes.toolName}>
                  <Text>{tool.name}</Text>
                </span>
              </div>
            ))}
          </div>
          
          <div className={classes.buttonsContainer}>
            <Link 
              href="/news"
              onLinkStart={(event, { isInternal }) => {
                if (isInternal && this.secuenceElement) {
                  this.secuenceElement.exit();
                }
              }}
            >
              <div className={classes.actionButton}>
                GO BACK
              </div>
            </Link>
            <div 
              className={classes.actionButton}
              onClick={this.handleCreateFolder}
            >
              MAKE MY FOLDER
            </div>
          </div>
        </Secuence>
      </Main>
    );
  }
}

export default withStyles(styles)(SolanaPage);