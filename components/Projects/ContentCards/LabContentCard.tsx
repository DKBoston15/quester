import { useDeleteLab } from 'hooks/labs/useDeleteLab';
import useGetLabByIdQuery from 'hooks/labs/useLabById';
import { useUpdateLabs } from 'hooks/labs/useUpdateLab';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import ContentItemList from '../InputFields/ContentItemList';
import TextInputField from '../InputFields/TextInputField';

type Item = {
  id: number;
  title: string;
};

export default function LabContentCard({
  lab,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledLab,
    isLoading,
    isError
  } = useGetLabByIdQuery({ id: lab.id });
  const router = useRouter();
  const deleteLab = useDeleteLab();
  const updateLab = useUpdateLabs();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [manager, setManager] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [equipment, setEquipment] = useState<Item[]>([]);
  const [instruments, setInstruments] = useState<Item[]>([]);
  const [products, setProducts] = useState<Item[]>([]);
  const [patents, setPatents] = useState<Item[]>([]);

  useEffect(() => {
    if (pulledLab) {
      if (pulledLab.length > 0) {
        setTitle(pulledLab[0].title);
        setLink(pulledLab[0].link);
        setManager(pulledLab[0].manager);
        setEmail(pulledLab[0].email);
        setPhoneNumber(pulledLab[0].phone_number);
        setEquipment(JSON.parse(pulledLab[0].equipment) || []);
        setInstruments(JSON.parse(pulledLab[0].instruments) || []);
        setProducts(JSON.parse(pulledLab[0].products) || []);
        setPatents(JSON.parse(pulledLab[0].patents) || []);
      }
    }
  }, [lab, pulledLab]);

  const updateExistingLab = async () => {
    if (!updateLab) return;
    await updateLab.mutateAsync({
      id: lab.id,
      title,
      link,
      manager,
      email,
      phoneNumber,
      equipment,
      instruments,
      products,
      patents
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    if (!deleteLab) return;
    await deleteLab.mutateAsync({
      id: lab.id
    });
    router.push(`/app/projects/${lab.project_item_id}`);
  };

  const createNewItem = (value: string, type: string) => {
    let newItem;
    if (type === 'equipment') {
      newItem = { id: equipment.length + 1, title: value };
      setEquipment([...equipment, newItem]);
    } else if (type === 'instrument') {
      newItem = { id: instruments.length + 1, title: value };
      setInstruments([...instruments, newItem]);
    } else if (type === 'product') {
      newItem = { id: products.length + 1, title: value };
      setProducts([...products, newItem]);
    } else if (type === 'patent') {
      newItem = { id: patents.length + 1, title: value };
      setPatents([...patents, newItem]);
    }
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={lab.title}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => setCurrentlyUpdating(true)}
              >
                Update
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => window.location.assign(link)}
              >
                Link
              </button>
            </div>
          </div>
        )}
        {currentlyUpdating && (
          <div className="flex justify-between">
            <div className="flex flex-col space-y-4">
              <TextInputField
                title="Title"
                value={title}
                setValue={setTitle}
                width="w-[23rem]"
              />
            </div>
            <div className="flex flex-col space-y-12 w-96">
              <div className="flex space-x-4 justify-end">
                <button
                  type="button"
                  className="inline-flex h-8 items-center justify-center rounded-md border border-transparent border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={() => setCurrentlyUpdating(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex h-8 items-center justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  onClick={() => updateExistingLab()}
                >
                  Save
                </button>
              </div>

              <div className="flex justify-end w-full">
                <TextInputField
                  width="w-96"
                  title="Link"
                  value={link}
                  setValue={setLink}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Manager</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{manager}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={manager} setValue={setManager} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{email}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={email} setValue={setEmail} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{phoneNumber}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={phoneNumber} setValue={setPhoneNumber} />
            )}
          </div>
        </dl>

        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <ContentItemList
              title="Equipment"
              modalTitle="piece of equipment"
              iconName="user"
              items={equipment || []}
              createNewItem={createNewItem}
              type="equipment"
              currentlyUpdating={currentlyUpdating}
            />
          </div>
          <div className="sm:col-span-1">
            <ContentItemList
              title="Instruments"
              modalTitle="instrument"
              iconName="user"
              items={instruments || []}
              createNewItem={createNewItem}
              type="instrument"
              currentlyUpdating={currentlyUpdating}
            />
          </div>
        </dl>
      </div>
      <div className="px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <ContentItemList
              title="Products"
              modalTitle="product"
              iconName="user"
              items={products || []}
              createNewItem={createNewItem}
              type="product"
              currentlyUpdating={currentlyUpdating}
            />
          </div>
          <div className="sm:col-span-1">
            <ContentItemList
              title="Patents"
              modalTitle="patent"
              iconName="user"
              items={patents || []}
              createNewItem={createNewItem}
              type="patent"
              currentlyUpdating={currentlyUpdating}
            />
          </div>
        </dl>
      </div>
    </div>
  );
}
