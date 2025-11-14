// RecipeService.txt - Atualizado
import { api } from '@/lib/api';
import { CreateRecipeRequest, CreateRecipeResponse, RecipesResponse, CreateAvaliationDto, AvaliationResponse } from '@/types/api';

export const recipeService = {
  // GET /Recipe - Listar receitas com filtros
  async getRecipes(params?: {
    PageSize?: number;
    PageNumber?: number;
    TitleSearch?: string;
    Categories?: string[];
    MinRating?: number;
    MaxRating?: number;
    MinPreparationTime?: number;
    MaxPreparationTime?: number;
    MinPortions?: number;
    MaxPortions?: number;
    UserId?: number;
    SortBy?: string;
    SortDescending?: boolean;
    FullResult?: boolean;
  }): Promise<RecipesResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v.toString()));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }
    
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/Recipe?${queryString}` : '/Recipe';
    
    return api.get(endpoint);
  },

  // POST /Recipe - Criar receita
  async createRecipe(recipeData: CreateRecipeRequest): Promise<CreateRecipeResponse> {
    return api.post('/Recipe', recipeData);
  },

  // POST /Comments - Criar avaliação
  async createAvaliation(avaliationData: CreateAvaliationDto): Promise<AvaliationResponse> {
    return api.post('/Comments', avaliationData);
  },

  // GET /Comments - Listar avaliações de uma receita
  async getAvaliations(recipeId: number, pageSize: number = 10, pageNumber: number = 1): Promise<any> {
    return api.get(`/Comments?RecipeId=${recipeId}&PageSize=${pageSize}&PageNumber=${pageNumber}`);
  },
};