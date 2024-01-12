import React, { Component, useState, useEffect } from 'react';
import {
  Animated,
  Button,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';

const { width } = Dimensions.get('screen');

let data = [1, 2,3];

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function WorkImages() {
  const [layoutData, setData] = useState(null);

  return (
    <View>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingVertical: 20 }}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item: index }) => (
          <RenderItem index={index} toggleModal={(data) => setData(data)} />
        )}
        numColumns={2}
      />
      {layoutData !== null && (
        <ModalView layoutData={layoutData} close={() => setData(null)} />
      )}
    </View>
  );
}

function ModalView({ layoutData, close }) {
  const { x, y, _width, _height } = layoutData;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setExpanded(true);
    }, 10);
  }, []);

  const onRequestClose = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        150,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      ),
      () => {
        close();
      }
    );
    setExpanded(false);
  };

  return (
    <Modal visible onRequestClose={onRequestClose} transparent>
      <View style={styles.center}>
        {expanded && (
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: '#000000aa' }]}
          />
        )}
        <View
          style={[
            expanded
              ? { height: '90%', width: '95%' }
              : {
                  height: _height,
                  width: _width,
                  left: x,
                  top: y,
                  position: 'absolute',
                },
            { backgroundColor: '#ccc', overflow: 'hidden' },
          ]}
        >
          <Image
           source={require('@src/assets/images/repair.jpg')}
            resizeMode="cover"
            style={styles.fill}
          />
          {expanded && (
            <View style={styles.close}>
              <Button title="close" onPress={onRequestClose} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

class RenderItem extends Component {
  shouldComponentUpdate = () => false;

  render() {
    const { index, toggleModal } = this.props;
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: '#fff' }}
          onPress={() => toggleModal(index)}
          onLongPress={() => toggleModal(index)}
          activeOpacity={0.7}>
          <Image
             source={require('@src/assets/images/repair.jpg')}
            resizeMode="cover"
            style={[styles.fill, imageStyles[index % 3]]} // Applying different styles based on the index
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const imageStyles = [
  {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  {
    height: 95,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    marginTop: 10,
  },
  {
    height: 95,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    marginTop: 10,
  },
];

const styles = StyleSheet.create({
  item: {
    height: width / 3.5,
    flex: 1,
    padding: 3,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    width: '100%',
  },
});

