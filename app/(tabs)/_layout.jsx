import AnimatedTabIcon from '@/components/ui/AnimatedTabIcon';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

export default function TabLayout() {
  const tabScreens = [
    { name: 'index', label: 'Home', icon: 'house.fill' },
    { name: 'info', label: 'Information', icon: 'info.circle.fill' },
    { name: 'about', label: 'About', icon: 'person.crop.circle' },
    { name: 'blogs', label: 'Blog', icon: 'doc.text.image' },
  ];

  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      {tabScreens.map(({ name, label, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarLabel: ({ focused }) =>
              focused ? (
                <Text style={{ color: '#00A693', fontSize: 12 }}>{label}</Text>
              ) : null,
            tabBarIcon: ({ color, focused }) => (
              <AnimatedTabIcon
                icon={icon}
                focused={focused}
                color={focused ? '#00A693' : color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}


