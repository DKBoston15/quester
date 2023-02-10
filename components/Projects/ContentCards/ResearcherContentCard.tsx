import { findItemByName } from '@/utils/helpers';
import {
  paradigmTypes,
  professorialStatuses,
  projectRoles,
  roles
} from 'constants/dropdownLists';
import { useDeleteParadigm } from 'hooks/paradigms/useDeleteParadigm';
import useGetParadigmByIdQuery from 'hooks/paradigms/useParadigmById';
import { useUpdateParadigm } from 'hooks/paradigms/useUpdateParadigm';
import { useDeleteQuestion } from 'hooks/questions/useDeleteQuestion';
import useGetQuestionByIdQuery from 'hooks/questions/useQuestionById';
import { useUpdateQuestion } from 'hooks/questions/useUpdateQuestion';
import { useDeleteResearcher } from 'hooks/researchers/useDeleteResearcher';
import useGetResearcherByIdQuery from 'hooks/researchers/useResearcherById';
import { useUpdateResearcher } from 'hooks/researchers/useUpdateResearcher';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DeleteItemModal from '../DeleteModals/DeleteItemModal';
import InputTypeSelectionDropdown from '../InputFields/InputTypeSelectionDropdown';
import TextInputField from '../InputFields/TextInputField';

export default function ResearcherContentCard({
  researcher,
  openDeleteModal,
  setOpenDeleteModal
}: any) {
  const {
    data: pulledResearcher,
    isLoading,
    isError
  } = useGetResearcherByIdQuery({ id: researcher.id });
  const router = useRouter();
  const deleteResearcher = useDeleteResearcher();
  const updateResearcher = useUpdateResearcher();
  const [currentlyUpdating, setCurrentlyUpdating] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [university, setUniversity] = useState('');
  const [role, setRole] = useState('');
  const [professorialStatus, setProfessorialStatus] = useState('');
  const [projectRole, setProjectRole] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (pulledResearcher) {
      if (pulledResearcher.length > 0) {
        setFirstName(pulledResearcher[0].first_name);
        setLastName(pulledResearcher[0].last_name);
        setLink(pulledResearcher[0].link);
        setEmail(pulledResearcher[0].email);
        setPhoneNumber(pulledResearcher[0].phone);
        setLinkedin(pulledResearcher[0].linkedin);
        setWebsite(pulledResearcher[0].website);
        setUniversity(pulledResearcher[0].university);
        const item1 = findItemByName(roles, pulledResearcher[0].role);
        setRole(item1 ? item1 : { id: 0, name: '' });
        const item2 = findItemByName(
          professorialStatuses,
          pulledResearcher[0].professorial_status
        );
        setProfessorialStatus(item2 ? item2 : { id: 0, name: '' });
        const item3 = findItemByName(
          projectRoles,
          pulledResearcher[0].project_role
        );
        setProjectRole(item3 ? item3 : { id: 0, name: '' });
      }
    }
  }, [researcher, pulledResearcher]);

  const updateExistingResearcher = async () => {
    await updateResearcher.mutateAsync({
      id: researcher.id,
      firstName,
      lastName,
      email,
      phone: phoneNumber,
      linkedin,
      website,
      university,
      role:
        typeof role === 'object' && role.hasOwnProperty('name')
          ? role.name
          : role,
      link,
      professorialStatus:
        typeof professorialStatus === 'object' &&
        professorialStatus.hasOwnProperty('name')
          ? professorialStatus.name
          : professorialStatus,
      projectRole:
        typeof projectRole === 'object' && projectRole.hasOwnProperty('name')
          ? projectRole.name
          : projectRole
    });

    setCurrentlyUpdating(false);
  };

  const deleteCurrentItem = async () => {
    setOpenDeleteModal(false);
    await deleteResearcher.mutateAsync({
      id: researcher.id
    });
    router.push(`/app/projects/${researcher.project_item_id}`);
  };

  return (
    <div className="overflow-visible bg-white shadow sm:rounded-lg">
      <DeleteItemModal
        deleteCurrentItem={deleteCurrentItem}
        setDeleteModalOpen={setOpenDeleteModal}
        deleteModalOpen={openDeleteModal}
        itemName={`${researcher.firstName} ${researcher.lastName}`}
      />
      <div className="px-4 py-5 sm:px-6">
        {!currentlyUpdating && (
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {firstName} {lastName}
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
                title="First Name"
                value={firstName}
                setValue={setFirstName}
                width="w-[23rem]"
              />
              <TextInputField
                title="Last Name"
                value={lastName}
                setValue={setLastName}
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
                  onClick={() => updateExistingResearcher()}
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
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
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
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Linkedin</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{linkedin}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={linkedin} setValue={setLinkedin} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Website</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{website}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={website} setValue={setWebsite} />
            )}
          </div>
        </dl>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">University</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{university}</dd>
            )}
            {currentlyUpdating && (
              <TextInputField value={university} setValue={setUniversity} />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Professorial Status
            </dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">
                {professorialStatus.name}
              </dd>
            )}
            {currentlyUpdating && (
              <InputTypeSelectionDropdown
                selectedType={professorialStatus}
                setSelectedType={setProfessorialStatus}
                list={professorialStatuses}
                width="w-[23rem]"
              />
            )}
          </div>
        </dl>

        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 pb-12">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{role.name}</dd>
            )}
            {currentlyUpdating && (
              <InputTypeSelectionDropdown
                selectedType={role}
                setSelectedType={setRole}
                list={roles}
                width="w-[23rem]"
              />
            )}
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Project Role</dt>
            {!currentlyUpdating && (
              <dd className="mt-1 text-sm text-gray-900">{projectRole.name}</dd>
            )}
            {currentlyUpdating && (
              <InputTypeSelectionDropdown
                selectedType={projectRole}
                setSelectedType={setProjectRole}
                list={projectRoles}
                width="w-[23rem]"
              />
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
