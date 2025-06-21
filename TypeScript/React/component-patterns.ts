/**
 * Patrones Avanzados de Componentes React con TypeScript
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Compound Components con Context
type TabsContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be within Tabs');
  }
  return context;
}

type TabsProps = {
  defaultActive: string;
  children: ReactNode;
};

export function Tabs({ defaultActive, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActive);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

type TabProps = {
  id: string;
  children: ReactNode;
};

export function Tab({ id, children }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();
  
  return (
    <button
      className={`tab ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

type TabPanelProps = {
  id: string;
  children: ReactNode;
};

export function TabPanel({ id, children }: TabPanelProps) {
  const { activeTab } = useTabs();
  return activeTab === id ? <div className="panel">{children}</div> : null;
}

// 2. Componentes genéricos
interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  keyExtractor: (item: T) => string | number;
}

export function Table<T>({ data, columns, keyExtractor }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={String(column.key)}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={keyExtractor(item)}>
            {columns.map(column => (
              <td key={String(column.key)}>
                {column.render 
                  ? column.render(item) 
                  : String(item[column.key])
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Uso
type User = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
};

const userColumns: TableColumn<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { 
    key: 'status', 
    header: 'Status',
    render: (user) => (
      <span className={`status-${user.status}`}>
        {user.status.toUpperCase()}
      </span>
    )
  },
];

// 3. Higher-Order Component con tipos
function withLoading<TProps extends object>(
  Component: React.ComponentType<TProps>
) {
  return function WithLoading(props: TProps & { isLoading?: boolean }) {
    const { isLoading, ...rest } = props;
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    return <Component {...rest as TProps} />;
  };
}
