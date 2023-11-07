import { act, renderHook } from '@testing-library/react';
import { useSearch } from '../useSearch';

describe('test useSearch hook', () => {
  vi.useFakeTimers();
  it('should initialize with empty searchValue and initialData', () => {
    const { result } = renderHook(() => useSearch([]));
    expect(result.current.searchValue).toBe('');
    expect(result.current.filteredData).toEqual([]);
  });
  it('should update searchValue when setSearchValue is called', () => {
    const { result } = renderHook(() => useSearch([]));

    act(() => {
      result.current.setSearchValue('example');
    });
    expect(result.current.searchValue).toBe('example');
  });

  it('should filter data when searchValue changes', async () => {
    const initialData = [
      {
        vehicleRegistrationNumber: 'SD 45121',
        vehicleType: 'solo',
        driverName: 'TestName',
        driverPhoneNumber: '+48213223',
      },
      {
        vehicleRegistrationNumber: 'SD 22214',
        vehicleType: 'solo',
        driverName: 'TestName2',
        driverPhoneNumber: '+48213123',
      },
    ];
    const { result } = renderHook(() => useSearch(initialData));

    act(() => {
      result.current.setSearchValue('SD 45121');
    });
    act(() => {
      vi.runAllTimers();
    });
    expect(result.current.searchValue).toEqual('SD 45121');

    expect(result.current.filteredData).toEqual([initialData[0]]);
  });
});
