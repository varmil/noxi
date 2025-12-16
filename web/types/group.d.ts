// Group関連の型定義

export interface Group {
  id: string
  name: string
  iconSrc: string
}

export interface GroupRegistration {
  id: number
  groupId: string
  name: string
  iconSrc: string
  status: 'pending' | 'approved' | 'rejected'
  appliedAt: Date
}

// API Request/Response 型定義

export interface CreateGroupRequest {
  id: string
  name: string
  iconSrc: string
}

export interface UpdateGroupRequest {
  name?: string
  iconSrc?: string
}

export interface CreateGroupRegistrationRequest {
  groupId: string
  name: string
  iconSrc: string
}

export interface UpdateGroupRegistrationStatusRequest {
  status: 'pending' | 'approved' | 'rejected'
}

// API Response 型定義

export interface GroupsResponse {
  groups: Group[]
}

export interface GroupRegistrationsResponse {
  registrations: GroupRegistration[]
}

export interface GroupResponse {
  group: Group
}

export interface GroupRegistrationResponse {
  registration: GroupRegistration
}

// エラーレスポンス型定義

export interface GroupApiError {
  message: string
  statusCode: number
}
