import { useEvents } from '@/hooks/useEvents'
import Image from 'next/image'
import moment from 'moment'


export default function Home() {

  const { events, isLoading } = useEvents(1, 10);

  const formatDate = (date: string) => {
    return moment(date).format('MMM D, h:mm A');
  };
  
  return (
    <div className='bg-white p-20'>
      <div className='min-h-[80vh] rounded-2xl rounded-b-none shadow border border-zinc-100'>
        <div className='flex flex-col'>
          <div className="w-full bg-neutral-100 rounded-t-2xl">
            <div className='flex flex-col gap-4 px-8 pt-8 pb-6'>
              <div className='flex flex-row'>
                <input type='text' placeholder='Search name, email or action...' className='w-3/4 p-2 ps-10 border-2 bg-transparent border-neutral-200 rounded-l-md focus:outline-none'/>
                <div className='flex flex-row gap-1 justify-center items-center p-4 border-y-2 border-r-2 border-neutral-200'>
                  <Image src='icons/filter.svg' width={18} height={18} alt={''} />
                  <div className="text-zinc-600 text-xs font-semibold uppercase">filter</div>
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
                <button className="text-start text-zinc-600 text-sm font-semibold uppercase">actor</button>
                <button className="text-start text-zinc-600 text-sm font-semibold uppercase">action</button>
                <button className="text-start text-zinc-600 text-sm font-semibold uppercase">date</button>
              </div>
            </div>
          </div>
          <div className='w-full grid grid-cols gap-8 py-6'>

            {/* <div className="w-full grid grid-cols-3 items-start px-8">
                <div className='flex flex-row gap-3 items-center justify-start'>
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-fuchsia-600 rounded-full text-white text-center inline-flex items-center justify-center">A</div>
                  <div className="text-zinc-900 text-sm font-normal font-['Inter']">event.actor_name</div>
                </div>
                <div className="text-zinc-900 text-sm font-normal font-['Inter']">event.action.name</div>
                <div className="text-zinc-900 text-sm font-normal font-['Inter']">event.action.occurred_at</div>
              </div> */}

            {isLoading ? <div>Loading...</div> : events?.map((event) => (
              <div key={event.id} className="w-full grid grid-cols-3 items-start px-8 max-h-5">
                <div className='flex flex-row gap-3 items-center justify-start'>
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-fuchsia-600 rounded-full text-white text-center inline-flex items-center justify-center">{event.actor_name.charAt(0)}</div>
                  <div className="text-zinc-900 text-sm font-normal font-['Inter']">{event.actor_name}</div>
                </div>
                <div className="text-zinc-900 text-sm font-normal font-['Inter']">{event.action.name}</div>
                <div className="text-zinc-900 text-sm font-normal font-['Inter']">{formatDate(event.occurred_at)}</div>
              </div>
            ))}

          </div>
        </div>
      </div>
      <div className='w-full bg-neutral-100 rounded-b-2xl shadow border border-zinc-100'>
          <div className='flex justify-center items-center p-4'>
            <button className='text-zinc-600 text-sm font-semibold uppercase'>Load more</button>
          </div>
        </div>
    </div>
  )
}
