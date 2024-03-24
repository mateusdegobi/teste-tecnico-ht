import { useNavigation } from '@react-navigation/native';
import Button from '@src/components/Button/Button';
import Container from '@src/components/Container/Container';
import { useObjectsContext } from '@src/contexts/ObjectsContext';
import { ObjectsType } from '@src/core/domain/entities/GeometricObject';
import React, { useState } from 'react';

import { ScrollView } from './styles';
import { ObjectKey } from './types';
import GeometricObjectSettings from './components/EditableGeometricFigure';

export default function SettingsScreen() {
  const { goBack } = useNavigation();

  const { objects, onEditObject } = useObjectsContext();

  const [editObject, setEditObject] = useState<ObjectsType | undefined>(objects);

  const handleSave = async () => {
    await onEditObject('object1', editObject?.object1);
    await onEditObject('object2', editObject?.object2);
    await onEditObject('object3', editObject?.object3);
    goBack();
  };

  const handleEditObject = (
    objectKey: ObjectKey,
    object: ObjectsType[ObjectKey],
    color: string
  ) => {
    setEditObject({
      ...editObject,
      [objectKey]: { ...object, color },
    });
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.entries(objects || {}).map(([name, object]) => (
          <GeometricObjectSettings name={name} object={object} editObject={handleEditObject} />
        ))}
      </ScrollView>

      <Button type="tertiary" onPress={goBack}>
        Restaurar para padrão
      </Button>
      <Button type="primary" onPress={handleSave} style={{ marginTop: 10 }}>
        Salvar
      </Button>
    </Container>
  );
}
