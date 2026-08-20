import React, { useState, useEffect } from 'react';
import { Search, User, Wrench, Package, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { graphService } from '../../api/graphService';
import { useDebounce } from '../../hooks/useDebounce';
import { NODE_COLORS } from '../../utils/constants';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      graphService.search(debouncedQuery).then((data) => {
        setResults(data);
        setIsOpen(true);
      }).catch(() => setResults([]));
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  const handleSelect = (item) => {
    setIsOpen(false);
    setQuery('');
    if (item.type === 'Developer') navigate(`/developers?id=${item.id}`);
    else if (item.type === 'Skill') navigate('/skills');
    else if (item.type === 'Project') navigate('/projects');
    else if (item.type === 'Company') navigate('/companies');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'Developer': return <User size={14} color={NODE_COLORS.Developer} />;
      case 'Skill': return <Wrench size={14} color={NODE_COLORS.Skill} />;
      case 'Project': return <Package size={14} color={NODE_COLORS.Project} />;
      case 'Company': return <Building size={14} color={NODE_COLORS.Company} />;
      default: return null;
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search network (developers, skills)..."
          className="search-input"
        />
      </div>

      {isOpen && (
        <div className="search-dropdown">
          {results.length === 0 ? (
            <div className="search-no-results">No matching entities found</div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="search-result-item"
              >
                {getIcon(item.type)}
                <span className="result-name">{item.name}</span>
                <span className="result-type" style={{ color: NODE_COLORS[item.type] }}>
                  {item.type}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
