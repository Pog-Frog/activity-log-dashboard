import { useEvents } from '@/hooks/useEvents'
import Image from 'next/image'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react';
import Event from '@/interfaces/event';
import useFilterModal from '@/hooks/useFilterModal';
import useDetailsModal from '@/hooks/useDetailsModal';


export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { events, isLoading } = useEvents(currentPage, 10, searchQuery);

  const [isOpen, setIsOpen] = useState(false);
  const filterModal = useFilterModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const detailsModal = useDetailsModal();
  const toggleDetailsOpen = useCallback(() => {
    setIsDetailsOpen((prev) => !prev);
  }, []);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    toggleDetailsOpen();
  };

  const [filterType, setFilterType] = useState('actor_name');
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterType(e.target.value);
  };

  useEffect(() => {
    if (events) {
      setCurrentEvents(prevEvents => [...prevEvents, ...events]);
    }
  }, [events]);

  const formatDate = (date: string) => {
    return moment(date).format('MMM D, h:mm A');
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEvents([]);
    setCurrentPage(1);
    setSearchQuery(e.target.value);
  };

  return (
    <div className='bg-white p-20'>
      <div className='min-h-[80vh] rounded-2xl rounded-b-none shadow border border-zinc-100'>
        <div className='flex flex-col'>
          <div className="w-full bg-neutral-100 rounded-t-2xl">
            <div className='flex flex-col gap-4 px-8 pt-8 pb-6'>
              <div className='flex flex-row'>
                <input type='text' onChange={handleSearchChange} placeholder='Search name, email or action...' className='w-3/4 p-2 ps-10 border-2 bg-transparent border-neutral-200 rounded-l-md focus:outline-none' />
                <div className='flex fle-col gap-1 relative'>
                  <button onClick={toggleOpen} className='flex flex-row gap-1 justify-center items-center p-4 border-y-2 border-r-2 border-neutral-200'>
                    <Image src='icons/filter.svg' width={18} height={18} alt={''} />
                    <div className="text-zinc-600 text-xs font-semibold uppercase">filter</div>
                  </button>
                  {isOpen && (
                    <div className="absolute rounded-xl shadow-md min-h-[10vh] min-w-[10vw] bg-white overflow-hidden right-30 top-16 text-sm">
                      <div className="flex flex-col gap-2 cursor-pointer items-center justify-center p-2">
                        <ul className="flex flex-col gap-2">
                          <li className="flex flex-row gap-2 items-center">
                            <input type="radio" name="filterType" value="actor_name" checked={filterType === 'actor_name'} onChange={handleFilterChange} />
                            <label>Actor Name</label>
                          </li>
                          <li className="flex flex-row gap-2 items-center">
                            <input type="radio" name="filterType" value="actor_id" checked={filterType === 'actor_id'} onChange={handleFilterChange} />
                            <label>Actor ID</label>
                          </li>
                          <li className="flex flex-row gap-2 items-center">
                            <input type="radio" name="filterType" value="target_id" checked={filterType === 'target_id'} onChange={handleFilterChange} />
                            <label>Target ID</label>
                          </li>
                          <li className="flex flex-row gap-2 items-center">
                            <input type="radio" name="filterType" value="action_id" checked={filterType === 'action_id'} onChange={handleFilterChange} />
                            <label>Action ID</label>
                          </li>
                          <li className="flex flex-row gap-2 items-center">
                            <input type="radio" name="filterType" value="action_name" checked={filterType === 'action_name'} onChange={handleFilterChange} />
                            <label>Action Name</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex flex-row gap-1 justify-center items-center p-4 border-y-2 border-r-2 border-neutral-200'>
                  <Image src='icons/export.svg' width={18} height={18} alt={''} />
                  <div className="text-zinc-600 text-xs font-semibold uppercase">export</div>
                </div>
                <div className='flex flex-row gap-1 justify-center items-center p-4 rounded-r-md border-y-2 border-r-2 border-neutral-200'>
                  <Image src='icons/eclipse.svg' width={18} height={18} alt={''} />
                  <div className="text-zinc-600 text-xs font-semibold uppercase">live</div>
                </div>
              </div>
              <div className='grid grid-cols-3'>
                <div className="text-start text-zinc-600 text-sm font-semibold uppercase">actor</div>
                <div className="text-start text-zinc-600 text-sm font-semibold uppercase">action</div>
                <div className="text-start text-zinc-600 text-sm font-semibold uppercase">date</div>
              </div>
            </div>
          </div>
          <div className='w-full grid grid-cols gap-8 py-6'>

            {(isDetailsOpen && selectedEvent) && (
              <div className="fixed inset-0 flex justify-center items-center">
                <div className="relative min-w-[85%] rounded-2xl shadow border border-zinc-100 bg-white p-10 items-center justify-center">
                  <button
                    className="absolute top-0 right-0 m-4 text-zinc-600 hover:text-zinc-800"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    <Image src='icons/close.svg' width={24} height={24} alt={''} />
                  </button>
                  <div className='grid grid-cols-3 gap-x-48 gap-y-10 items-start'>

                    <div className='flex flex-col gap-5'>
                      <div className="text-neutral-400 text-sm font-medium uppercase">actor</div>
                      <div className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter']">Name</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.actor_name}</div>
                        </div>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter'] mr-6">Id</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.actor_id}</div>
                        </div>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter']">Group</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.group}</div>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                      <div className="text-neutral-400 text-sm font-medium uppercase">action</div>
                      <div className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter'] mr-6">Id</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.action.id}</div>
                        </div>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter']">Object</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.action.object}</div>
                        </div>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter'] mr-1">Name</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.action.name}</div>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                      <div className="text-neutral-400 text-sm font-medium uppercase">date</div>
                      <div className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter']">Readable</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{formatDate(selectedEvent?.occurred_at)}</div>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                      <div className="text-neutral-400 text-sm font-medium uppercase">metadata</div>
                      <div className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter'] mr-16">Id</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.metadata.id}</div>
                        </div>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter'] mr-8">Redirect</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.metadata.redirect}</div>
                        </div>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter'] mr-1">X-Request-Id</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.metadata.x_request_id}</div>
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                      <div className="text-neutral-400 text-sm font-medium uppercase">target</div>
                      <div className='flex flex-col gap-3'>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter'] mr-8">Id</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.target_id}</div>
                        </div>
                        <div className='flex flex-row gap-3'>
                          <div className="text-neutral-400 text-sm font-normal font-['Inter'] mr-2">Name</div>
                          <div className="text-black text-sm font-normal font-['Inter']">{selectedEvent?.target_name}</div>
                        </div>
                      </div>
                      <div className='flex flex-col gap-3'>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {isLoading ? <div>Loading...</div> : currentEvents?.map((event) => (
              <button key={event.id} className="w-full grid grid-cols-3 items-start px-8 max-h-5 text-start" onClick={() => handleEventClick(event)}>
                <div className='flex flex-row gap-3 items-center justify-start'>
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-fuchsia-600 rounded-full text-white text-center inline-flex items-center justify-center">{event.actor_name.charAt(0)}</div>
                  <div className="text-zinc-900 text-sm font-normal font-['Inter']">{event.actor_name}</div>
                </div>
                <div className="text-zinc-900 text-sm font-normal font-['Inter']">{event.action.name}</div>
                <div className="text-zinc-900 text-sm font-normal font-['Inter']">{formatDate(event.occurred_at)}</div>
              </button>
            ))}

          </div>
        </div>
      </div>
      <div className='w-full bg-neutral-100 rounded-b-2xl shadow border border-zinc-100'>
        <div className='flex justify-center items-center p-4'>
          <button className='text-zinc-600 text-sm font-semibold uppercase' onClick={handleLoadMore}>Load more</button>
        </div>
      </div>
    </div>
  )
}
