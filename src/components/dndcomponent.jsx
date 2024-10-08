import { cardsData } from "../bin/CardsData";
import { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DndContext } from "../context/DndContext.jsx";
import { FaAngleDown, FaAngleRight, FaAngleUp } from "react-icons/fa6";
import { RiFlightLandLine, RiFlightTakeoffLine } from "react-icons/ri";
import { GrMenu } from "react-icons/gr";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import UpArrow from '../../public/assets/images/up-arrow.png';

const DndComponent = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(true);
  const [showServices, setShowServices] = useState({});
  const [droppableId, setDroppableId] = useState(`${uuidv4()}==All==Awaiting Confirmation`);
  const [ConfirmdroppableId,setConfirmdroppableId]=useState(`${uuidv4()}==All==Confirmed`);
  const [CompletedroppableId,setCompletedroppableId]=useState(`${uuidv4()}==All==Completed`);




  const handlerShowServices = (userid, VALUE) => {
    setShowServices((previous) => ({
      ...previous,
      [userid]: VALUE,
    }));
  };

  const onDragEnd = (result) => {
    try {
      const { source, destination, type } = result;
      if (!destination) return;
      const newData = [...JSON.parse(JSON.stringify(data))];

      if (type === "FLIGHT") {
        if (source.droppableId !== destination.droppableId) {
          const oldDroppableIndex = newData.findIndex(
            (x) => x.id == source.droppableId.split("droppable")[1]
          );
          const newDroppableIndex = newData.findIndex(
            (x) => x.id == destination.droppableId.split("droppable")[1]
          );
          const [item] = newData[oldDroppableIndex].components.splice(
            source.index,
            1
          );

          // console.log('oldDroppableIndex', oldDroppableIndex)
          // console.log('newDroppableIndex', newDroppableIndex)
          if (oldDroppableIndex == 0 || newDroppableIndex == 0) {
            console.error("All Open Flights is Read only.")
            return
          }

          if(newDroppableIndex==2)
          {
            console.error("Cannot move flight in Awaiting Confirmation, Only service can move.")
            return
          }


          newData[newDroppableIndex].components.splice(
            destination.index,
            0,
            item
          );
          setData(newData);
        } else {
          const droppableIndex = newData.findIndex(
            (x) => x.id == source.droppableId.split("droppable")[1]
          );
          const [item] = newData[droppableIndex].components.splice(
            source.index,
            1
          );
          newData[droppableIndex].components.splice(destination.index, 0, item);

          setData(newData);
        }
      } else if (type === "SERVICE") {
        const [sourceFlightIndex, serviceType, seviceID] = source.droppableId.split("==");
        const [destFlightIndex, destServiceType, DesColumnName] = destination.droppableId.split("==")

        if (destServiceType == "All") {
          newData.map((val) => {
            if (val.title === DesColumnName && val.components.length === 0) {
              val.components.push({
                id: destFlightIndex
              });
            }
          });
        } else if (
          ((serviceType == "ArrivalServices" ||
            serviceType == "DepartureServices" || serviceType =="EventServices") &&
            sourceFlightIndex !== destFlightIndex) ||
          serviceType !== destServiceType
        ) {
          console.error("Moving the Whole Event Block Should NOT be allowed.");
          return;
        }
        const sourceList = newData.find((list) =>
          list.components.some((comp) => comp.id === sourceFlightIndex)
        );

        const destList = newData.find((list) =>
          list.components.some((comp) => comp.id === destFlightIndex)
        );

        if (!sourceList || !destList) {
          console.error("Source or destination not found");
          return;
        }

        const sourceFlight = sourceList.components.find(
          (comp) => comp.id === sourceFlightIndex
        );
        const destFlight = destList.components.find(
          (comp) => comp.id === destFlightIndex
        );

        
        if(sourceList?.id == 0 || destList?.id == 0)
          {
            if (sourceFlight?.id !== destFlight?.id) {
              console.error("All Open Flights is Read only.")
              return;
            }
        }

        if (destServiceType === "All") {
          const copiedComponent = { ...sourceFlight };

          if (serviceType === "ArrivalServices") {
            copiedComponent.ArrivalServices = copiedComponent.ArrivalServices.filter(service => service?.id == seviceID).map(service => ({
              ...service,
              id: uuidv4(),
            }));
            copiedComponent.EventServices = [];
            copiedComponent.DepartureServices = [];
          }

          else if (serviceType === "EventServices") {
            copiedComponent.EventServices = copiedComponent.EventServices.filter(service => service?.id == seviceID).map(service => ({
              ...service,
              id: uuidv4(),
            }));
            copiedComponent.ArrivalServices = [];
            copiedComponent.DepartureServices = [];
          }

          if (serviceType === "DepartureServices") {
            copiedComponent.DepartureServices = copiedComponent.DepartureServices.filter(service => service?.id == seviceID).map(service => ({
              ...service,
              id: uuidv4(),
            }));
            copiedComponent.EventServices = [];
            copiedComponent.ArrivalServices = [];
          }
          copiedComponent.id = destFlightIndex;

          const matchingComponent = destList.components.find(
            (comp) => comp.id === destFlightIndex
          );

          if (matchingComponent) {
            Object.assign(matchingComponent, copiedComponent);
          }
        } else {
          let sourceServices = sourceFlight[serviceType];
          let destServices = destFlight[destServiceType];

          if (!sourceServices || !destServices) {
            console.error("Source or destination services not found");
            return;
          }
          const [movedService] = sourceServices.splice(source.index, 1);
          const exist = destServices.some((item) => item?.name === movedService?.name);

          if (exist) {
            console.error("This Service already exists");
            return;
          }

          destServices.splice(destination.index, 0, movedService);
        }
        setDroppableId(`${uuidv4()}==All==Awaiting Confirmation`);
        setConfirmdroppableId(`${uuidv4()}==All==Confirmed`);
        setCompletedroppableId(`${uuidv4()}==All==Completed`);
        setData(newData);
      }
    } catch (error) {
      console.log('Error:--', error)
    }
  };


  useEffect(() => {
    setData(cardsData);
  }, []);

  return (
    <div className="p-[20px] h-screen overflow-auto">
      <div className="grid grid-cols-5 gap-4 flex-col lg:flex-row">
        {["All open flights", "To Be Actioned", "Awaiting Confirmation", "Confirmed", "Completed"].map((title) => (
          <h2 key={title} className="text-center font-medium text-[#212121] bg-[#f1f1f1] p-[10px] rounded-md text-[14px]">
            {title}
          </h2>
        ))}
      </div>

      <button className="flex items-center gap-2 mt-4" onClick={() => setOpen(!open)}>
        <span>{open ? <FaAngleDown /> : <FaAngleUp />}</span>
        <h1>Frank Flight Operator</h1>
      </button>

      <DndContext onDragEnd={onDragEnd}>
        {open && (
          <div className="grid grid-cols-5 gap-4 flex-col lg:flex-row h-full">
            {data?.map((val, flightIndex) => (
              <Droppable key={flightIndex} droppableId={`droppable${flightIndex}`} type="FLIGHT">
                {(provided) => (
                  <div className="w-full bg-white h-full" {...provided.droppableProps} ref={provided.innerRef}>
                    <div className="bg-[#f8f8f8] p-1.5 flex gap-2 flex-col mt-3 rounded-md w-full h-full">
                      {val.components.length > 0 ? (
                        val.components.map((component, index) => (
                          <Draggable key={component?.id} draggableId={component?.id.toString()} index={index} type="FLIGHT">
                            {(provided) => (
                              <div
                                className="bg-[#fff] border-l-[3px] border-l-slate-600 shadow-[rgba(99,99,99,0.2)_0px_2px_8px_0px] px-4 py-3 rounded-md w-full"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                {component?.flightType === "Open" ? (
                                  <div className="flex justify-between items-center mb-2">
                                    <h1 className="bg-[#3077c9] py-[3px] px-[10px] rounded-md inline-block border-0 text-white">
                                      {component?.FilghtNumber}
                                    </h1>
                                    <Image src={UpArrow} alt="UpArrow" width={12} height={12} />
                                  </div>
                                ) : (
                                  <h1>{component?.FilghtNumber}</h1>
                                )}

                                <div className="flex items-center gap-3">
                                  <div className="flex gap-2">
                                    <RiFlightLandLine className="text-[#ccc] text-[18px]" />
                                    <p className="text-[14px] text-[#76787c] font-medium">{component?.ArrivalDate}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <RiFlightTakeoffLine className="text-[#ccc] text-[18px]" />
                                    <p className="text-[14px] text-[#76787c] font-medium">{component?.DepartureDate}</p>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center mt-[16px]">
                                  <p className="text-[14px] text-[#76787c]">View All Services</p>
                                  <button onClick={() => handlerShowServices(component?.id, !showServices[component?.id])} className="text-[#ccc]">
                                    {showServices[component?.id] ? <FaAngleDown /> : <FaAngleRight />}
                                  </button>
                                </div>
                                {showServices[component?.id] && (
                                  <>
                                    {["EventServices", "ArrivalServices", "DepartureServices"].map((serviceType) => (
                                      <div key={serviceType}>
                                        <h1 className="mt-[16px] text-[14px] text-[#76787c]">{serviceType.replace("Services", " services")}</h1>

                                        <div className={`grid gap-2 mt-2 ${component?.flightType == "Open" ? 'grid-cols-none' : 'grid-cols-2'}  `}>
                                          {component[serviceType]?.length > 0 ? ( // Check if there are services to display
                                            component[serviceType].map((service, index) => (
                                              <div key={service.id}>
                                                {component?.flightType === "Open" ? (
                                                  <div className="bg-[#f9f9f9] p-2 justify-between mb-1 flex gap-2 items-center rounded">
                                                    <span className="text-[14px]">{service?.name}</span>
                                                    <span
                                                      className={`text-[12px] font-medium ${service?.status === "Confirmed" ? "text-[#3ef525]" : "text-[#a09a9a]"}`}
                                                    >
                                                      {service?.status}
                                                    </span>
                                                  </div>
                                                ) : (
                                                  <Droppable key={service.id} droppableId={`${component.id}==${serviceType}==${service.id}`} type="SERVICE">
                                                    {(provided) => (
                                                      <div ref={provided.innerRef} {...provided.droppableProps}>
                                                        <Draggable key={service.id} draggableId={service.id} index={index} type="SERVICE">
                                                          {(provided) => (
                                                            <div
                                                              className="bg-[#f8f8f8] p-2 mb-1 flex gap-2 items-center border-[1px] border-[#eee] rounded"
                                                              {...provided.draggableProps}
                                                              {...provided.dragHandleProps}
                                                              ref={provided.innerRef}
                                                            >
                                                              <GrMenu className="text-[#aaa] text-[18px]" />
                                                              <span className="text-[14px]">{service.name}</span>
                                                            </div>
                                                          )}
                                                        </Draggable>
                                                        {provided.placeholder}
                                                      </div>
                                                    )}
                                                  </Droppable>
                                                )}
                                              </div>
                                            ))
                                          ) : component?.EventServices?.length == 0 && (
                                            <Droppable droppableId={`${component.id}==${serviceType}`} type="SERVICE">
                                              {(provided) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.droppableProps}
                                                  className=" p-2 justify-between mb-2 flex gap-2 items-center rounded"
                                                >
                                                  {provided.placeholder}
                                                </div>
                                              )}
                                            </Droppable>
                                          )}
                                        </div>
                                      </div>
                                    ))}


                                  </>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))
                      ) : (

                        
                      (val?.title=="Awaiting Confirmation" && <Droppable droppableId={droppableId} type="SERVICE">
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="bg-[#f8f8f8] h-full border-dashed border-2 border-[#ccc] p-4 rounded-md text-center"
                              >
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable> ) || 
                          (val?.title=="Confirmed" && <Droppable droppableId={ConfirmdroppableId} type="SERVICE">
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="bg-[#f8f8f8] h-full border-dashed border-2 border-[#ccc] p-4 rounded-md text-center"
                              >
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable> ) ||
                          (val?.title=="Completed" && <Droppable droppableId={CompletedroppableId} type="SERVICE">
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="bg-[#f8f8f8] h-full border-dashed border-2 border-[#ccc] p-4 rounded-md text-center"
                              >
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable> )
                      )}
                    
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default DndComponent;



